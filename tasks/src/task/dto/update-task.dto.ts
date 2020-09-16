import { CreateTaskDto } from './create-task.dto';
import {PickType} from '@nestjs/swagger';
export class UpdateTaskDto extends PickType(CreateTaskDto, ['title', 'description', 'status', 'time']){
}