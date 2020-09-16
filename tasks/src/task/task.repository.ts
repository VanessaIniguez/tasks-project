import { TaskUtil } from './../utils/task.util';
import { User } from './../user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectService } from './../project/project.service';
import { ConflictException, NotFoundException } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { Project } from 'src/project/project.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    /**
     * 
     * @param id 
     */
    async getTasks(id: number): Promise<Task[]> {
        return await this.find({where:{projectId: id}});
    }

    /**
     * 
     * @param id 
     */
    async  getTask(id: number, idProject: number) {
        const task = await this.findOne({id: id, projectId: idProject});

        if(!task){
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    /**
     * 
     * @param id 
     * @param createTaskDto 
     */
    async  createTask(project: Project, createTaskDto: CreateTaskDto): Promise<Task> {
       
        const task = TaskUtil.getNewTask(createTaskDto);
        console.log(project);

        task.project = project;

        try {
            return await task.save();
          }catch(err){
            if(err){
                throw new ConflictException('Error when create the task');
            }
        }
    }


    /**
     * 
     * @param updateTaskDto 
     * @param id 
     */
    async updateTask(updateTaskDto: UpdateTaskDto, id: number): Promise<Task> {

        let task = await this.findOne({id: id});

        if(!task){
            throw new ConflictException("The task doesn't exist");
        }
        
        task = TaskUtil.getUpdatedTask(task, updateTaskDto);

        try {
            return await task.save();
          }catch(err){
            if(err){
                throw new ConflictException('Error when update the task');
            }
        }
    }
}