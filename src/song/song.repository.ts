import { DataSource, EntityRepository, Repository } from "typeorm";
import { Song } from "./song.entity"
import { Injectable } from "@nestjs/common";
import { createSongDto } from "./dto/create-song.dto";

@Injectable()
export class SongRepository extends Repository<Song>{
    constructor(private dataSource: DataSource){
        super(Song, dataSource.createEntityManager())
    }

    async createSong(createSongDto: createSongDto): Promise<Song> {
        const { title, year, genre } = createSongDto

        const song = this.create({
            title,
            year,
            genre
        });

        await this.save(song); //interaction with db happens here
        return song
    }
}
