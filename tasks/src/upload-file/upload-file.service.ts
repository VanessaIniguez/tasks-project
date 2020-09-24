import { use } from 'passport';
import { UserService } from './../user/user.service';
import { Injectable, ConflictException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { existsSync } from 'fs';

@Injectable()
export class UploadFileService {
    

    constructor(private userService: UserService){}


    async uploadFile(file: any, user: User) {
        return this.userService.uploadFile(file, user);
    }

    async serveImage(image, res: any, user: User) {
        const currentUser = await this.userService.user(user.id);
        const path =  `./src/uploads/user/${currentUser.image}`;

        if(!existsSync(path)){
            throw new ConflictException('No image exists');
        }else{
            return res.sendFile(image, { root: './src/uploads/user' });
            
        }
    }
    
}
