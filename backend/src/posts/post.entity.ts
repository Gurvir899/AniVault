import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "../users/user.entity";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    body!: string;

    @Column()
    animeId!: number;

    @Column()
    animeTitle!: string;

    @Column({ nullable: true })
    animeCoverUrl!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column()
    userId!: number;

    @CreateDateColumn()
    createdAt!: Date;
}
