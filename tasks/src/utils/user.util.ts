import { User } from './../user/user.entity';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UpdateUserDto } from './../user/dto/update-user.dto';


import * as bcrypt from 'bcryptjs';
export class UserUtils {

    static getNewUser(createUserDto: CreateUserDto): User{

        const {name, lastName, username, email, password} = createUserDto;

        const user = new User();

        user.name = name;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        user.password = password;
        user.status = true;

        return user;
    }

    static updateCurrentUser(updateUserDto: UpdateUserDto){
        const {name, lastName} = updateUserDto;

        const user = new User();

        user.name = name || user.name;
        user.lastName = lastName || user.lastName;

        return user;

    }

    static async encryptPassword(password: string): Promise<string>{

        return await bcrypt.hash(password, 12);

    }

}