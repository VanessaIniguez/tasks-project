import { AuthUtils } from './../utils/auth.utils';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './../user/user.entity';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserRepository } from './../user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    /**
     * 
     * @param createUserDto 
     */
    async singUp(createUserDto: CreateUserDto): Promise<User>{
        return await this.userRepository.createUser(createUserDto);
    }
    
    /**
     * 
     * @param authCredentialsDto
     */
    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const user: User =  await this.userRepository.validateCredentials(authCredentialsDto);
        
        if(!user){
            throw new UnauthorizedException('Invalid Credentials');
        }

        return await this.getUserWithAccessToken(user);
    }


    async getUserWithAccessToken(user: User){
        const accessToken = await this.jwtService.sign(
            AuthUtils.getPayload(user.email)
        );

        return accessToken;
    }
}
