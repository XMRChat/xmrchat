import {
  Controller,
  Post,
  UploadedFile,
  Param,
  ParseEnumPipe,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { ImageUploadInterceptor } from 'src/shared/interceptors/image-upload.interceptor';
import { FilesService } from './files.service';
import { FileType } from 'src/shared/constants/enum';
import { MinioService } from './minio.service';
import { Express } from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import { FilesInterceptor } from 'src/shared/interceptors/files.interceptor';
import { CreateFileDto } from './dtos/create-file.dto';

@Controller('upload')
export class FilesController {
  constructor(
    private filesService: FilesService,
    private minioService: MinioService,
  ) {}

  @IsPublic()
  @ImageUploadInterceptor()
  @Post('/image/:slug')
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('slug', new ParseEnumPipe(FileType)) slug: FileType,
  ) {
    throw new BadRequestException('Use the /upload/:type endpoint instead');
    if (!file) throw new BadRequestException('No file is uploaded.');

    const fileBuffer = await fs.readFile(file.path);

    await this.minioService.uploadFile(fileBuffer, 'images', file.filename);

    const thumbnailBuffer = await sharp(fileBuffer)
      .resize(120, 120, { fit: 'cover' })
      .toBuffer();

    const thumbnailFileName = `thumbnail-${file.filename}`;

    await this.minioService.uploadFile(
      thumbnailBuffer,
      'thumbnails',
      thumbnailFileName,
    );

    const savedFile = await this.filesService.createFile({
      filename: file.filename,
      type: slug,
      originalName: file.originalname,
      url: this.filesService.getImageUrl(file.filename),
      thumbnail: this.filesService.getImageUrl(thumbnailFileName, {
        isThumbnail: true,
      }),
    });

    return {
      file: savedFile,
    };
  }

  @Post('/create-thumbnails')
  @IsPublic()
  createThumbnails() {
    throw new BadRequestException('This request should no longer be used.');
    return this.filesService.generateThumbnailsForCurrentLogos();
  }

  @Post('/:type')
  @UseInterceptors(FilesInterceptor)
  async uploadFile(
    @UploadedFiles() files: CreateFileDto[],
    @Param('type', new ParseEnumPipe(FileType)) type: FileType,
  ) {
    const result = await this.filesService.createMultipleFiles(files);
    return { files: result };
  }
}
