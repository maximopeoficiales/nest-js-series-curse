import { RolType } from "src/modules/role/types/rol.types";

export interface IJwtPayload {
    id: number;
    username: string;
    email: string;
    roles: RolType[];
    iat?: Date;
}