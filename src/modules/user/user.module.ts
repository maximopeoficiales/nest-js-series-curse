import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositorys/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { User } from './entitys/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }
