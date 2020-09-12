import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    TypeOrmModule
  ]
})
export class UserModule {}
