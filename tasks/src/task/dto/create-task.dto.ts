import { TaskStatusEnum } from './../../enums/task-status.enum';
import { IsIn, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateTaskDto{


    @IsNotEmpty({
        message: "Title shouldn't be empty"
      })
    @Length(3, 
        50, 
        {message: "Title must have at lleast 3 characters and a maximum of 50"})
    title: string;

    @IsNotEmpty({
        message: "Description shouldn't be empty"
      })
    @Length(3, 
        50, 
        {message: "Description must have at lleast 5 characters and a maximum of 50"})
    description: string;


    @IsNotEmpty({
        message:  "El estado del proyecto es requerido"
      })
      @IsIn([TaskStatusEnum.IN_PROGRESS, TaskStatusEnum.STAND_BY, TaskStatusEnum.DONE], {
        message: "Incorrect Status"
      })
    status: TaskStatusEnum;

    // @IsNumber()
    time: number;


}