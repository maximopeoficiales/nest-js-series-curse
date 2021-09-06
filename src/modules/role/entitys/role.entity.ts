import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entitys/user.entity";


@Entity("roles")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    name: string;

    @Column({ type: "text", nullable: false })
    description: string;

    // muchos usuarios tienen muchos roles
    @ManyToMany(type => User, user => user.roles)
    @JoinColumn()
    users: User[];

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn({ type: "timestamp", name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;


}