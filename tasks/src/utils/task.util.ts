import { UpdateTaskDto } from './../task/dto/update-task.dto';
import { Task } from './../task/task.entity';
import { CreateTaskDto } from './../task/dto/create-task.dto';

export class TaskUtil {

    static getNewTask(createTaskDto: CreateTaskDto){

        const {description,title, status, time} = createTaskDto;

        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = status;
        task.time= time !== null ? time : 30;

        return task;
    }

    static getUpdatedTask(task: Task, updateTaskDto: UpdateTaskDto): Task {

        const {title, description, status, time} = updateTaskDto;

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.time = time || task.time;

        return task;
       


    }
}