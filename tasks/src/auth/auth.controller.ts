import { GetUser } from './../decorators/get-user.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './../user/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User>{
        return this.authService.singUp(createUserDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto){
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }
}
