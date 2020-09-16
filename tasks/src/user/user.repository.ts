import { AuthCredentialsDto } from './../auth/dto/auth-credentials.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUtils } from './../utils/user.util';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { NotFoundException, ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    /**
     * 
     * @param id
     */
    async getUser(id: number): Promise<User>{

        const user =  await this.findOne({id: id, status: true});

        if(!user){
            console.log('Entro aquii');
            throw new NotFoundException('User not found');
            
        }
        return user;
    }

    /**
     * 
     * @param createUserDto 
     */
    async createUser(createUserDto: CreateUserDto): Promise<User>{

        const user = UserUtils.getNewUser(createUserDto);
        user.password = await UserUtils.encryptPassword(user.password);
        try {
            return await user.save();
        }catch(err){
                if(err.code === '23505'){
                    throw new ConflictException('Username or email already exist');
                }else{
                    throw new InternalServerErrorException('Error Server');
                }
        }
    }

    /**
     * 
     * @param id 
     * @param updateUserDto 
     */
    async updateUser(id: number, updateUserDto: UpdateUserDto):Promise<User> {

        const user = await this.getUser(id);

        const {name, lastName} = updateUserDto;

        user.name = name;
        user.lastName = lastName;

        try {
         return await user.save();
        }catch(err){
            if(err){
                throw new ConflictException('Error when updating the user');
            }
        }
    }

    /**
     * 
     * @param id
     */
    async updateStatusUser(id: number):Promise<Boolean>{

        const user =  await this.getUser(id);
        user.status = false;

        try{
            user.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async  validateCredentials(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const {email, password} = authCredentialsDto;

        const user = await this.findOne({email: email, status: true});

        if(user && await user.validatePassword(password)){
            return user;
        }else{
            return null;
        }
    }
}