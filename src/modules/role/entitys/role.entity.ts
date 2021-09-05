import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entitys/user.entity";


@Entity("roles")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20, nullable: false })
    name: string;

    @Column({ type: "text", nullable: false })
    description: string;

    // muchos usuarios tienen muchos roles
    @ManyToMany(type => User, user => user.roles)
    @JoinColumn()
    users: User[];

    @Column({ default: true })
    status: boolean;

    @Column({ type: "timestamp", name: "created_at" })
    createdAt: Date;

    @Column({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;

}