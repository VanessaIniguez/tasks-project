import { CreateProjectDto } from './create-project.dto';
import {PickType} from '@nestjs/swagger';
export class UpdateProjectDto extends PickType(CreateProjectDto, ['name', 'description']){
}