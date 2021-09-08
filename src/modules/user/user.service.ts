import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { Role } from '../role/entitys/role.entity';
import { UserDetails } from './entitys/user.details.entity';
import { User } from './entitys/user.entity';
import { UserRepository } from './repositorys/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository
    ) {

    }

    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException("id must be sent");
        }
        const user: User = await this._userRepository.findOne(id, { where: { status: true } })
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
    async getAll(): Promise<User[]> {
        const users: User[] = await this._userRepository.find({ where: { status: true } })
        return users;
    }

    async create(user: User): Promise<User> {
        // creamos el detalle
        const details = new UserDetails();
        user.details = details;

        const repo =  getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: "GENERAL" } });
        // le agregamos un rol por defecto
        user.roles = [defaultRole];

        const savedUser = await this._userRepository.save(user);

        return savedUser;
    }
    async update(id: number, user: User): Promise<void> {
        const updatedUser = await this._userRepository.update(id, user);
        // return updatedUser;
    }

    async delete(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException("id must be sent");
        }
        const userExists: User = await this._userRepository.findOne(id, { where: { status: true } })
        if (!userExists) {
            throw new NotFoundException();
        }
        await this._userRepository.update(id, { status: false });
    }
}
