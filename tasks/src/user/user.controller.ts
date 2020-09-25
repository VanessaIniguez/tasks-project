import { AuthGuard } from '@nestjs/passport';
import { UploadImageUtil } from './../utils/upload-image.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res, UploadedFile, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { diskStorage } from 'multer';
import { ApiBody } from '@nestjs/swagger';
import { extname } from 'path';
import { UpdatePasswordDto } from './dto/update-password.dto';



@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    /**
     * 
     * @param id
     */
    @Get('/:id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return this.userService.user(id);
    }
    

    /**
     * 
     * @param updateUser
     */
    @Put('/:id')
    updateUser(@Param('id', ParseIntPipe)id: number,
                @Body() updateUserDto: UpdateUserDto): Promise<User>{
        return this.userService.updateUser(id,updateUserDto);
    }

    /**
     * 
     * @param id 
     */
    @Put('/:id')
    updateStatusUser(@Param('id', ParseIntPipe)id: number): Promise<Boolean>{
        return this.userService.updateStatusUser(id);
    }


    /**
     * 
     * @param updatePasswordDto 
     * @param user 
     */
    @Put()
    @UseGuards(AuthGuard())
    updatePassword(@Body() updatePasswordDto: UpdatePasswordDto,
                   @GetUser() user: User){
        return this.userService.updatePassword(updatePasswordDto, user);

    }
    /**
     *
     * @param updatePasswordDto 
     * @param user 
     */
    @Post()
    @UseGuards(AuthGuard())
    verifyPassword(@Body() updatePasswordDto: UpdatePasswordDto,
                    @GetUser() user: User){
        return this.userService.verifyPassword(updatePasswordDto, user);


    }
   
}
