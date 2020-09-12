//import { Project } from './../project/project.entity';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar', length: 50})
    name: string;

    @Column({type: 'varchar', length: 50})
    lastName: string;

    @Column({type: 'varchar', length: 20, unique: true })
    username: string;

    @Column({type: 'varchar', length: 50, unique: true})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar', nullable: true})
    image: string;

    @Column()
    status: boolean;


    async validatePassword(password: string): Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }
}