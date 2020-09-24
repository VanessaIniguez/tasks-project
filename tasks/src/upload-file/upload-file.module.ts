import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [UploadFileController],
  providers: [UploadFileService]
})
export class UploadFileModule {}
