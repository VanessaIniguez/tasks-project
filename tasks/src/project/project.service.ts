import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from './../user/user.entity';
import { ProjectRepository } from './project.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectRepository)
        private projectRepository: ProjectRepository){}

    async getProject(user: User, id: number): Promise<Project>{
        return this.projectRepository.getProject(user,id);
    }


    /**
     * 
     * @param user 
     */
   async getProjects(user: User): Promise<Project[]>{
        return await this.projectRepository.getProjects(user);
    }

   async createProject(user: User,
                       createProjectDto: CreateProjectDto): Promise<Project>{
        return await this.projectRepository.createProject(user,
            createProjectDto);

    }

   async updateProject(user: User,
         updateProjectDto: UpdateProjectDto,
         id: number): Promise<Project> {
        return this.projectRepository.updateProject(user, updateProjectDto, id);
    }
}
