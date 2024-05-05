import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: string;

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

    // @OneToMany(() => SongController, song => song.artist)
    // songs: Song[];
    
}