import { Project } from 'src/project/project.entity';
import { CreateProjectDto } from './../project/dto/create-project.dto';



export class ProjectUtil {

    static getNewProject(createProjectDto: CreateProjectDto){

        const {name, description} = createProjectDto;
        const project = new Project();

        project.name = name;
        project.description = description;
        project.status = true;

        return project;
    }

 
}