import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    /**
     * 
     * @param id
     */
    @Get('/:id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return this.userService.getUser(id);

    }
    

    /**
     * 
     * @param updateUser
     */
    @Put('/:id')
    updateUser(@Param('id', ParseIntPipe)id: number, @Body() updateUserDto: UpdateUserDto): Promise<User>{
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


    
}
