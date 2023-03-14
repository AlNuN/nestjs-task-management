import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersRepository extends Repository<User> {
  readonly DUPLICATE_USERNAME_ERROR = '23505'
t
  constructor(
    private dataSource: DataSource
  ) {
    super(User, dataSource.createEntityManager())
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({
      username,
      password: hashedPassword
    })

    try {
      await this.save(user)
    } catch (error) {
      if (
        error instanceof QueryFailedError
        && error.driverError.code === this.DUPLICATE_USERNAME_ERROR
      ) {
        throw new ConflictException('Username already exists')
      }
      throw new InternalServerErrorException()
    }
  }

}
