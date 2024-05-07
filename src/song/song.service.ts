import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { createSongDto } from './dto/create-song.dto';
import { updateSongDto } from './dto/update-song.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(SongRepository)
        private readonly songRepository: SongRepository,
    ){}

    async getAllSongs(): Promise<Song[]>{
        return await this.songRepository.find();
    }

    createSong(createSongDto: createSongDto): Promise<Song>{
        return this.songRepository.createSong(createSongDto);
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
