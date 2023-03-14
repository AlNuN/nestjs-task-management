import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
  imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}
