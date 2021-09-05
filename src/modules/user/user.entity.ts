import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column({ default: true })
    status: boolean;

    @Column({ type: "timestamp", name: "created_at" })
    createdAt: Date;

    @Column({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;


}