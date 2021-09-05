import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../role/entitys/role.entity";
import { UserDetails } from "./user.details.entity";


@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, unique: true, nullable: false })
    username: string;

    @Column({ length: 25, unique: true, nullable: false })
    email: string;

    @Column({ length: 250, nullable: false })
    password: string;


    // muchos usuarios tienen muchos roles
    @ManyToMany(type => Role, role => role.users, { eager: true })
    @JoinTable({ name: "user_roles" })
    roles: Role[];

    // type relacion,cascade crear el registro cuando crea el usuario, eaget se trae el objeto en relacion
    // detail:id es el fk
    @OneToOne(type => UserDetails, { cascade: true, nullable: false, eager: true })
    @JoinColumn({ name: "detail_id" })
    details: UserDetails;


    @Column({ default: true })
    status: boolean;

    @Column({ type: "timestamp", name: "created_at" })
    createdAt: Date;

    @Column({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;

}