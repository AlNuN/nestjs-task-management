import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskStatus } from './task-status.enum'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const {status, search} = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status)
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) =>
  //       task.title.toLowerCase().includes(search) ||
  //         task.description.toLowerCase().includes(search)
  //     )
  //   }
  //   return tasks
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({id})

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    return task
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description} = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    })

    await this.tasksRepository.save(task)

    return task;
  }

  // deleteTask(id: string):void {
  //   this.getTaskById(id)
  //   this.tasks = this.tasks.filter((task) => task.id !== id)
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   this.tasks = this.tasks.map((task) => {
  //     if (task.id === id) task.status = status
  //     return task
  //   });

  //   return this.getTaskById(id)
  // }
}
