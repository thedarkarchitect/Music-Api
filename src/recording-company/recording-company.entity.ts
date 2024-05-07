import { Song } from "src/song/song.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class RecordingCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyName: string;

    @Column()
    yearFounded: string;

    @Column()
    headQuarters: string;

    @OneToMany(() => Song, song => song.recordingCompany)
    songs: Song[];
}