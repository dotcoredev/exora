import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service.js';
import { UploadFileController } from './upload-file.controller.js';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
