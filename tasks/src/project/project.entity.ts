import { Task } from './../task/task.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Project extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @ManyToOne(type => User, user => user.projects)
    user: User;

    @Column()
    userId:  number;

    @OneToMany(type => Task, task => task.project)
    tasks: Task[];


}