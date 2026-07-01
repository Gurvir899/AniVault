import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;
}