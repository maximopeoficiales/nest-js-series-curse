import { IsNotEmpty } from "class-validator";
import { RolType } from "src/modules/role/types/rol.types";
import { UserDetails } from "../entitys/user.details.entity";

export class UserDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    roles: RolType[];

    @IsNotEmpty()
    details: UserDetails;
}