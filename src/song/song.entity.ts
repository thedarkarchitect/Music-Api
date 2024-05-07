import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    year: string;

    @Column()
    genre: string;

    @ManyToOne(() => User, (User) => User.songs, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
}