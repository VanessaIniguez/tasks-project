import { User } from './../user/user.entity';
import { UploadImageUtil } from './../utils/upload-image.util';
import { UploadFileService } from './upload-file.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Res, UseGuards, UseInterceptors, UploadedFile, Get, Param, Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('uploadFile')
@UseGuards(AuthGuard())
export class UploadFileController {

    constructor(private uploadFileService: UploadFileService){}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './src/uploads/user',
                filename: UploadImageUtil.uploadImage

            }),
            fileFilter: UploadImageUtil.getExtensionValid
        })
    )
    uploadFile(@UploadedFile() file,
               @GetUser() user: User){
        return this.uploadFileService.uploadFile(file, user);
    }


    @Get(':idImage')
    serveImage(@Param('idImage') image,
                @Res() res,
                @GetUser() user: User){
        return this.uploadFileService.serveImage(image, res, user);
    }



}
