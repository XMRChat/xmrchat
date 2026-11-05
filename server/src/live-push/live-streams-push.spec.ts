import { LiveStream } from 'src/live-streams/live-stream.entity';
import { LiveStreamsService } from 'src/live-streams/live-streams.service';
import { LiveStreamPlatformEnum } from 'src/shared/constants';

describe('live list update with live push', () => {
  const stream = {
    pageId: 1,
    platform: LiveStreamPlatformEnum.YOUTUBE,
    videoId: 'video',
    startedAt: new Date().toISOString(),
    data: { embedUrl: 'https://example.com/player' },
  };

  const build = (updateSnapshot: jest.Mock) => {
    const outer = {
      transaction: jest.fn(async (callback) => {
        try {
          return await callback({ savepoint: true });
        } catch (error) {
          outer.rolledBack.push(error);
          throw error;
        }
      }),
      rolledBack: [] as unknown[],
      delete: jest.fn(),
      save: jest.fn(),
    };
    const repo = {
      manager: { transaction: (callback) => callback(outer) },
      create: (value) => value,
    };
    const args: any[] = Array(13).fill({});
    args[8] = repo;
    args[12] = { updateSnapshot };
    const service = new (LiveStreamsService as any)(
      ...args,
    ) as LiveStreamsService;
    jest
      .spyOn((service as any).logger, 'error')
      .mockImplementation(() => undefined);
    return { service, outer };
  };

  it('runs the push snapshot in a savepoint and saves its session fields', async () => {
    const updateSnapshot = jest.fn(async (_manager, streams) =>
      streams.map((item) => ({
        ...item,
        data: { ...item.data, notificationSessionId: 'session' },
      })),
    );
    const { service, outer } = build(updateSnapshot);
    await service.updateLiveStreams([stream]);
    expect(outer.transaction).toHaveBeenCalledTimes(1);
    expect(updateSnapshot).toHaveBeenCalledWith({ savepoint: true }, [stream]);
    expect(outer.save.mock.calls[0][1][0].data).toEqual({
      embedUrl: 'https://example.com/player',
      notificationSessionId: 'session',
    });
  });

  it('logs a push failure, rolls back only the savepoint and still saves the plain list', async () => {
    const { service, outer } = build(
      jest.fn().mockRejectedValue(new Error('push tables missing')),
    );
    await expect(service.updateLiveStreams([stream])).resolves.toBeUndefined();
    expect(outer.rolledBack).toHaveLength(1);
    expect(outer.delete).toHaveBeenCalledWith(LiveStream, {});
    expect(outer.save).toHaveBeenCalledWith(LiveStream, [
      expect.objectContaining({ videoId: 'video', data: stream.data }),
    ]);
    expect((service as any).logger.error).toHaveBeenCalledWith(
      expect.stringContaining('push tables missing'),
    );
  });
});
