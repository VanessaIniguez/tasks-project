import { TaskStatusEnum } from './../enums/task-status.enum';
import { Project } from './../project/project.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatusEnum;

    @Column()
    time: number;

    @ManyToOne(type => Project, project =>  project.tasks)
    project: Project

    @Column()
    projectId: number;

}