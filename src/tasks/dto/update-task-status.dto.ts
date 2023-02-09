import { TaskStatus } from "../task.model"

export class UpdateTaskStatusDto {
  constructor(public id: string, public status:TaskStatus) {}
}
