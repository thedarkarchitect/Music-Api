import { Song } from 'src/song/song.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    born: string

    @Column()
    genre: string;

    @Column()
    gender: string

    @OneToMany(() => Song, song => song.artist)
    songs: Song[];
    
}