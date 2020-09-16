import { ProjectService } from './../project/project.service';
import { User } from './../user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {

    /**
     * 
     * @param taskRepository 
     */
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        private projectService: ProjectService
    ){}

    /**
     * 
     * @param id 
     */
    async getTasks(id: number): Promise<Task[]> {
        return await this.taskRepository.getTasks(id);
    }

    /**
     * 
     * @param id 
     */
    async getTask(user: User,id: number, idProject: number) {
        const project = await this.projectService.getProject(user, idProject);
        if(!project){
             throw new Error("There is a problem at the time of obtaining the task");
        }
        return this.taskRepository.getTask(id, idProject);
    }

    /**
     * 
     * @param id 
     * @param createTaskDto 
     */
    async createTask(id: number, createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const project = await this.projectService.getProject(user, id);
        return await this.taskRepository.createTask(project,createTaskDto);
    }

    /**
     * 
     * @param updateTaskDto 
     * @param id 
     */
    async updateTask(updateTaskDto: UpdateTaskDto, id: number): Promise<Task> {
        return await this.taskRepository.updateTask(updateTaskDto, id);
    }
}
