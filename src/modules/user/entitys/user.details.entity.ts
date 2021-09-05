import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users_details")
export class UserDetails extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true, nullable: false })
    name: string;

    @Column({ nullable: false })
    lastname: string;

    @Column({ default: true })
    status: boolean;

    @Column({ type: "timestamp", name: "created_at" })
    createdAt: Date;

    @Column({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;


}