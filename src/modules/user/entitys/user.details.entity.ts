import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("users_details")
export class UserDetails extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, unique: true, nullable: true })
    name: string;

    @Column({ type: "varchar", nullable: true })
    lastname: string;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn({ type: "timestamp", name: "created_at", nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at", nullable: true })
    updatedAt: Date;


}