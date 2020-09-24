import { AuthModule } from './../auth/auth.module';
import { UserRepository } from './user.repository';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([UserRepository]),
  forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    TypeOrmModule,
    UserService
  ]
})
export class UserModule {}
