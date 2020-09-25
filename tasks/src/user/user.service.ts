import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
    

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    /**
     * 
     * @param id 
     */
    async user(id: number): Promise<User>{
        return  await this.userRepository.user(id);
    }

    
    async createUser(createUseDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUseDto);
    }

    async updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
        return this.userRepository.updateUser(id,updateUser);
    }


    async updateStatusUser(id: number):  Promise<Boolean> {
        return await this.userRepository.updateStatusUser(id);
    }

    async uploadFile(file: any, user: User) {
        return await this.userRepository.uploadFile(file, user);
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto, user: User) {
        return await this.userRepository.uploadPassword(updatePasswordDto, user);
    }

    async verifyPassword(updatePasswordDto: UpdatePasswordDto, user: User) {
        return await this.userRepository.verifyPassword(updatePasswordDto, user);
    }
}
