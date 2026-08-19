import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipReplyDto } from './dtos/create-tip-reply.dto';
import { TipsService } from 'src/tips/tips.service';
import { TipReply } from './tip-reply.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/shared/constants/enum';
import { User } from 'src/users/user.entity';
import { UpdateTipReplyDto } from './dtos/update-tip-reply.dto';

@Injectable()
export class TipRepliesService {
  constructor(
    private tipsService: TipsService,
    private caslAbilityFactory: CaslAbilityFactory,

    @InjectRepository(TipReply)
    private repo: Repository<TipReply>,
  ) {}

  async findOneById(id: number) {
    if (!id) throw new BadRequestException('Id is required.');
    const reply = await this.repo.findOne({
      where: { id },
      relations: { tip: true },
    });
    if (!reply) throw new NotFoundException('Tip reply is not found.');
    return reply;
  }

  async create(dto: CreateTipReplyDto, user: User, tipId: number) {
    const tip = await this.tipsService.findOneById(tipId);
    if (!tip) throw new NotFoundException('Tip is not found.');

    const created = this.repo.create({
      message: dto.message,
      tip,
    });

    const ability = await this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Create, created))
      throw new UnauthorizedException(
        'You are not authorized to create a tip reply.',
      );

    return await this.repo.save(created);
  }

  async update(id: number, dto: UpdateTipReplyDto, user: User) {
    const reply = await this.repo.findOne({
      where: { id },
      relations: { tip: { page: true } },
    });
    if (!reply) throw new NotFoundException('Tip reply is not found.');

    const ability = await this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, reply))
      throw new UnauthorizedException(
        'You are not authorized to update a tip reply.',
      );

    reply.message = dto.message;
    await this.repo.save(reply);

    return { message: 'Tip reply updated.' };
  }

  async delete(id: number, user: User) {
    const reply = await this.repo.findOne({
      where: { id },
      relations: { tip: { page: true } },
    });
    if (!reply) throw new NotFoundException('Tip reply is not found.');

    const ability = await this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, reply))
      throw new UnauthorizedException(
        'You are not authorized to delete a tip reply.',
      );

    await this.repo.remove(reply);
  }
}
