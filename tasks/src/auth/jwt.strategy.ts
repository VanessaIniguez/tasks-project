import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from '../user/user.repository';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret98'
        });
    }

    async validate(payload: JwtPayload){
        const {email} = payload;
        const user = await this.userRepository.findOne({email, status: true});

        if(!user){
            throw new UnauthorizedException('Unauthorized equest');
        }

        return user;
    }

}