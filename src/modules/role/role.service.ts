import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entitys/role.entity';
import { RoleRepository } from './repositorys/role.repository';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository
    ) {

    }

    async get(id: number): Promise<Role> {
        if (!id) {
            throw new BadRequestException("id must be sent");
        }
        const role: Role = await this._roleRepository.findOne(id, { where: { status: true } })
        if (!role) {
            throw new NotFoundException();
        }
        return role;
    }
    async getAll(): Promise<Role[]> {
        const roles: Role[] = await this._roleRepository.find({ where: { status: true } })
        return roles;
    }

    async create(role: Role): Promise<Role> {
        // creamos el detalle
        const savedRole = await this._roleRepository.save(role);
        return savedRole;
    }
    async update(id: number, role: Role): Promise<void> {
        const updatedRole = await this._roleRepository.update(id, role);
    }

    async delete(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException("id must be sent");
        }
        const roleExists: Role = await this._roleRepository.findOne(id, { where: { status: true } })
        if (!roleExists) {
            throw new NotFoundException();
        }
        await this._roleRepository.update(id, { status: false });
    }
}
