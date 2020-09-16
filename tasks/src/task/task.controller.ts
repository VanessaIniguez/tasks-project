import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from './../user/user.entity';
import { GetUser } from './../decorators/get-user.decorator';
import { TaskService } from './task.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

    constructor(private taskService: TaskService){}

    @Get('/:id')
    getTasks(@Param('id', ParseIntPipe) id: number){
        return this.taskService.getTasks(id);
    }

    @Get('/:idProject/:id')
    getTask(@GetUser() user: User,
            @Param('id', ParseIntPipe) id: number,
            @Param('idProject', ParseIntPipe) idProject: number){
        return this.taskService.getTask(user,id, idProject);
    }
    
    @Post('/:id')
    createTask(@Param('id', ParseIntPipe) id: number,
               @Body() createTaskDto: CreateTaskDto,
               @GetUser() user: User){
        return this.taskService.createTask(id, createTaskDto, user);
    }

    @Put(':id')
    updateTask(@Param('id', ParseIntPipe) id : number,
               @Body() updateTaskDto: UpdateTaskDto){
        return this.taskService.updateTask(updateTaskDto, id);
    }
}
