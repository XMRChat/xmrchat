import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { And, IsNull, Not, Repository } from 'typeorm';
import { PagesService } from 'src/pages/pages.service';
import { UpdateLinksDto } from './dto/update-links.dto';
import { Page } from 'src/pages/page.entity';
import { contentLinksWithDefaults } from 'src/shared/utils';
import { LinkPlatformEnum, PageStatusEnum } from 'src/shared/constants';
import { User } from 'src/users/user.entity';
import { LinkVerificationsService } from 'src/link-verifications/link-verifications.service';
import Parser from 'rss-parser';

@Injectable()
export class LinksService {
  constructor(
    private pagesService: PagesService,
    @InjectRepository(Link) private repo: Repository<Link>,
    private linkVerificationsService: LinkVerificationsService,
  ) {}

  async findByPageId(id: number) {
    if (!id) return null;

    const res = await this.repo.find({
      where: { page: { id } },
      relations: { verification: true },
    });

    return contentLinksWithDefaults(res);
  }

  async findOneByUserAndPlatform(user: User, platform: LinkPlatformEnum) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page is not found.');

    const link = await this.repo.findOne({
      where: { page: { id: page.id }, platform },
      relations: { verification: true },
    });
    if (!link) throw new NotFoundException('Link is not found.');
    return link;
  }

  async findByPlatform(platform: LinkPlatformEnum) {
    return this.repo.find({
      where: {
        platform,
        value: And(Not(IsNull()), Not('')),
        page: { status: Not(PageStatusEnum.DEACTIVE), isPublic: true },
      },
      relations: { page: true },
    });
  }

  async updateContentLinks(data: UpdateLinksDto, page: Page) {
    if (
      data.rumbleLiveStreamUrl &&
      !data.links.find((l) => l.platform === LinkPlatformEnum.RUMBLE)?.value
    ) {
      throw new BadRequestException(
        'Add a rumble link to your content links to use live stream URL.',
      );
    }

    // update name and search term from pages
    // await this.pagesService.updateNameAndSearchTerms(page.id, {
    //   name: data.name,
    //   searchTerms: data.searchTerms,
    // });

    // Get existing links to compare values
    const existingLinks = await this.repo.find({
      where: { page: { id: page.id } },
      relations: { verification: true },
    });

    // Check for value changes and remove verifications
    for (const link of data.links) {
      const existingLink = existingLinks.find(
        (l) => l.platform === link.platform,
      );

      // If link exists and value has changed, remove verification
      if (
        existingLink &&
        existingLink.value !== link.value &&
        existingLink.verification
      )
        await this.linkVerificationsService.deleteByLinkId(existingLink.id);
    }

    // upsert
    const links = data.links.map((l) => {
      return {
        page: { id: page.id },
        platform: l.platform,
        value: l.value,
        data: this.getLinkData(data, l.platform),
      };
    });

    return this.repo.upsert(links, ['page.id', 'platform']);
  }

  async validateRSSLink({ pageId, value }: { pageId: number; value?: string }) {
    if (!value) return { isValid: true, error: null };

    const normalizeRssValue = (raw: string) => {
      try {
        const parsed = new URL(raw.trim());
        parsed.hash = '';
        parsed.protocol = 'https:';
        parsed.hostname = parsed.hostname.replace(/^www\./, '');
        if (parsed.pathname.length > 1)
          parsed.pathname = parsed.pathname.replace(/\/+$/, '');
        return parsed.href;
      } catch {
        return undefined;
      }
    };

    const normalizedValue = normalizeRssValue(value);
    if (!normalizedValue) return { isValid: false, error: 'Invalid RSS link.' };

    const pageRSSLink = await this.repo.findOne({
      where: {
        platform: LinkPlatformEnum.PODCAST_RSS,
        value: And(Not(IsNull()), Not('')),
        page: { id: pageId },
      },
    });
    if (
      pageRSSLink?.value &&
      normalizeRssValue(pageRSSLink.value) === normalizedValue
    )
      return { isValid: true, error: null };

    const allRSSLinks = await this.repo.find({
      where: {
        platform: LinkPlatformEnum.PODCAST_RSS,
        value: And(Not(IsNull()), Not('')),
        page: { id: Not(pageId) },
      },
    });

    const isDuplicate = allRSSLinks.some(
      (link) =>
        !!link.value && normalizeRssValue(link.value) === normalizedValue,
    );
    if (isDuplicate)
      return { isValid: false, error: 'This RSS link is already used.' };

    // validate new rss link
    const parser = new Parser();
    try {
      await parser.parseURL(value);
    } catch (error) {
      console.log(error);

      return { isValid: false, error: 'Invalid RSS link.' };
    }

    return { isValid: true, error: null };
  }

  getLinkData(dto: UpdateLinksDto, platform: LinkPlatformEnum): any {
    if (platform === LinkPlatformEnum.RUMBLE) {
      if (!dto.rumbleLiveStreamUrl) return null;
      return { rumbleLiveStreamUrl: dto.rumbleLiveStreamUrl };
    }

    return null;
  }
}
