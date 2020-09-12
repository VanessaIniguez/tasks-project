import { CreateUserDto } from '../../user/dto/create-user.dto';
import { PickType } from "@nestjs/swagger";
export class AuthCredentialsDto extends PickType(CreateUserDto, ['email']){

    password: string

}