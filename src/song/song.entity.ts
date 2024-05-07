import { Artist } from "src/artist/artist.entity";
import { RecordingCompany } from "src/recording-company/recording-company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    year: string;

    @ManyToOne(() => Artist, artist => artist.songs)
    artist: Artist

    @ManyToOne(() => RecordingCompany, recordingCompany => recordingCompany.songs)
    recordingCompany: RecordingCompany;
}