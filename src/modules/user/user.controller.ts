import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/ jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { User } from './entitys/user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {

    }
    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
        const user = await this._userService.get(id);
        return user;
    }

    // @Public()
    @Get()
    async getUsers(): Promise<User[]> {
        const users = await this._userService.getAll();
        return users;
    }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        const createdUser = await this._userService.create(user);
        return createdUser;
    }


    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: User) {
        const updateUser = await this._userService.update(id, user);
        return true;
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        await this._userService.delete(id);
        return true;
    }
}




