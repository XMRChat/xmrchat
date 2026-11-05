import { isPublicAddress, resolvePushEndpoint } from './push-endpoint';

describe('push endpoint validation', () => {
  it.each([
    '127.0.0.1',
    '10.0.0.1',
    '169.254.169.254',
    '192.168.1.2',
    '::1',
    'fc00::1',
    'fe80::1',
    '::ffff:127.0.0.1',
    '0.0.0.0',
    '224.0.0.1',
  ])('rejects non-public address %s', (address) => {
    expect(isPublicAddress(address)).toBe(false);
  });

  it.each([
    'https://127.0.0.1/push',
    'https://[::1]/push',
    'http://8.8.8.8/push',
    'https://8.8.8.8:444/push',
    'https://user:secret@8.8.8.8/push',
    'https://8.8.8.8/push#fragment',
  ])('rejects unsafe endpoint %s', async (endpoint) => {
    await expect(resolvePushEndpoint(endpoint)).rejects.toThrow();
  });

  it('accepts and pins a public HTTPS destination', async () => {
    const result = await resolvePushEndpoint('https://8.8.8.8/push');
    expect(result.address).toBe('8.8.8.8');
  });
});
