import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from './../user/user.entity';
import { GetUser } from './../decorators/get-user.decorator';
import { ProjectService } from './project.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Project } from './project.entity';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {

    constructor(private projectService: ProjectService){}

    @Get('/:id')
    getProject(@GetUser() user: User, 
               @Param('id', ParseIntPipe) id: number): Promise<Project>{
        return this.projectService.getProject(user, id);

    }

    @Get()
    getProjects(@GetUser() user: User): Promise<Project[]>{

        return this.projectService.getProjects(user);
    }

    @Post()
    createProjects(@GetUser() user: User,
                   @Body() createProjectDto: CreateProjectDto): Promise<Project>{
        return this.projectService.createProject(user, createProjectDto);
    }

    @Post('/:id')
    updateProject(
        @GetUser() user: User,
        @Body() updateProjectDto: UpdateProjectDto,
        @Param('id', ParseIntPipe) id: number
    ){
        return this.projectService.updateProject(user, updateProjectDto, id);

    }
    
}
