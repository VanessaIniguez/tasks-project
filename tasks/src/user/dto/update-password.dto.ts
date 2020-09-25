import { OmitType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
export class UpdatePasswordDto extends PickType(CreateUserDto, ['password']){

}