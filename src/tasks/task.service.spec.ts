import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TaskStatus } from './task-status.enum'
import { TasksRepository } from "./task.repository"
import { TasksService } from "./tasks.service"

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOneBy: jest.fn(),
})

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
}

describe('TasksService', () => {
  let tasksService: TasksService
  let tasksRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository }
      ],
    }).compile()

    tasksService = module.get(TasksService)
    tasksRepository = module.get(TasksRepository)
  })

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue')
      const result = await tasksService.getTasks(null, mockUser)
      expect(result).toEqual('someValue')
    })
  })

  describe('gesTaskById', () => {
    it('calls TasksRepository.findOne and returs the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN,
      }

      tasksRepository.findOneBy.mockResolvedValue(mockTask)
      const result = await tasksService.getTaskById('someId', mockUser)
      expect(result).toEqual(mockTask)
    })

    it('calls TasksRepository.findOne and handles an error', () => {
      tasksRepository.findOneBy.mockResolvedValue(null)
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException
      )
    })

  })

})