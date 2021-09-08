import { genSalt, hash } from "bcryptjs";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { Role } from "../role/entitys/role.entity";
import { RoleRepository } from "../role/repositorys/role.repository";
import { RolType } from "../role/types/rol.types";
import { UserDetails } from "../user/entitys/user.details.entity";
import { User } from "../user/entitys/user.entity";
import { SigninDto, SignupDto } from "./dto";

@EntityRepository(User)
export class AuthRepository extends Repository<User>{
    async signup(signup: SignupDto) {
        const { password, username, email } = signup;
        const user = new User();
        user.username = username;
        user.email = email;

        // agrego rol por defecto al usuario
        const roleRepository: RoleRepository = getConnection().getRepository(Role);
        const defaultRole = await roleRepository.findOne({ where: { name: RolType.GENERAL } });
        // le agregamos un rol por defecto
        user.roles = [defaultRole];

        const details = new UserDetails();
        user.details = details;

        const salt = await genSalt(10);
        user.password = await hash(password, salt);
        await user.save();
    }
}