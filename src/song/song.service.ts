import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { createSongDto } from './dto/create-song.dto';
import { updateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song)
        private readonly songRepository: SongRepository,
    ){}

    async getAllSongs(): Promise<Song[]>{
        return await this.songRepository.find();
    }

    async createSong(createSongDto: createSongDto): Promise<Song>{
        const { title, year } = createSongDto

        const song = this.songRepository.create({ //this fill the fields in the db
            title,
            year,
        });

        await this.songRepository.save(song); //interaction with db happens here
        return song;
    }

    async getSongById(id: number): Promise<Song> {
        const song = await this.songRepository.findOneBy({
            id: id
        });
        if(!song){
            throw new NotFoundException(`Song with ID ${id} not found`);
        }
        return song;
    }

    async updateSongById(id: number, updateSongDto: updateSongDto): Promise<{status: string, song?: Song}> {
        const song = await this.songRepository.findOneBy({id:id});

        if(!song) {
            throw new NotFoundException(`Song with this ID ${id} not found.`)
        }

        Object.assign(song, updateSongDto);
        const updatedSong = await this.songRepository.save(song);
        if(updatedSong) {
            return {status: "Song updated", song: song};
        } else {
            return {status: "Song was not updated"};
        }
    }

    async deleteSong(id: number): Promise<{status: string, song?: Song}> {
        const song = await this.songRepository.findOneBy({id:id});

        if(!song) {
            throw new NotFoundException(`Song with this ID ${id} not found.`)
        }

        const deleted = await this.songRepository.delete(id);
        if(deleted){
            return {status: "Song deleted succcessfully", song: song} 
        } else {
            return {status: "Song not deleted"}
        }
    }
}
