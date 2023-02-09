import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string):void {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }

  updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const {id, status} = updateTaskStatusDto;

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) task.status = status
      return task
    });

    return this.getTaskById(id)
  }
}
