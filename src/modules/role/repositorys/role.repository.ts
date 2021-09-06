import { EntityRepository, Repository } from "typeorm";
import { Role } from "../entitys/role.entity";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role>{
    // custom querys

}