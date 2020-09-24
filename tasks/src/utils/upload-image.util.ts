import { existsSync, unlinkSync } from 'fs';
import { UserService } from './../user/user.service';

import { User } from './../user/user.entity';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { extname } from 'path';


export class UploadImageUtil {

    static validateExtensionFile(extension: string){

        const extensionSet = ['.png', '.jpg', '.gif', '.jpeg'];

        return extensionSet.indexOf(extension) < 0 ? false : true;
    }

    static isImage(file){

        if(!file){
            throw new ConflictException('There is no file');
        }
        return file;
    }

    

    static uploadImage(req, file, cb){
        const extensionValid = UploadImageUtil.extensionFile(file);
        console.log('ESTE ES EL FILEEEEEE', file);
        try {
            cb(null, `${req.user.id}-${new Date().getMilliseconds()}${extensionValid}`);
        }catch(err){
            throw new ConflictException('A problem occurred while uploading the image');
        }
        
    }

    static extensionFile(file){
        return extname(file.originalname);
    }


    static getExtensionValid(req, file, cb){
        const extension = UploadImageUtil.extensionFile(file);
        const isValidExtension = UploadImageUtil.validateExtensionFile(extension);
        
            if(!isValidExtension){
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
    }


    static deleteCurrentImage(imageUser: string){

        const currentImage = imageUser;
        const path =  `./src/uploads/user/${currentImage}`;

        if(existsSync(path)){
            unlinkSync(path);
        }
    }

}

 