import { ProjectUtil } from './../utils/project.util';
import { ConflictException } from '@nestjs/common';
import { Body, NotFoundException } from '@nestjs/common';
import { use } from 'passport';
import { Project } from './project.entity';
import { Repository, EntityRepository } from "typeorm";
import { User } from '../user/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project>{



    async getProject(user: User, id: number): Promise<Project>{
        const project = await this.findOne({where: { id: id,  userId: user.id}});

        if(!project){
            throw new NotFoundException('Project not found');
        }
        return project;
    }
    
    /**
     * 
     * @param user 
     */
    async getProjects(user: User): Promise<Project[]> {
        return await this.find({where: {userId: user.id}});
    }

    async createProject(user: User, createProjectDto: CreateProjectDto): Promise<Project>{

        const project = ProjectUtil.getNewProject(createProjectDto);
        project.user = user;

        try {
          return await project.save();
        }catch(err){
            console.log(err);
        }
    }

    async updateProject(user: User, updateProjectDto: UpdateProjectDto, id: number):Promise<Project> {

        const project = await this.getProject(user, id);

        const {name, description} = updateProjectDto;

        project.name = name || project.name;
        project.description = description || project.description;

        try {
            return await project.save();
           }catch(err){
               if(err){
                   throw new ConflictException('Error when updating the project');
               }
           }
    }

    async changeStatusProject(user: User, id: number){

        const project = await this.getProject(user, id);

        project.status = false;

        try {
            return await project.save();
           }catch(err){
               if(err){
                   throw new ConflictException('Error when updating project status');
               }
           }
    }

}