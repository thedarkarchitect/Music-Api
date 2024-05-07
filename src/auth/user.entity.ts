import { Song } from "src/song/song.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    password: string;

    @Column()
    country: string;

    @Column()
    born: string

    @Column()
    gender: string

    @OneToMany((_type) => Song, (song) => song.user, { eager: true })
    songs: Song[];
}