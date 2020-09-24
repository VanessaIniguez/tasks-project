import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    ProjectModule,
    TaskModule,
    UploadFileModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
