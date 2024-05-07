import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { createSongDto } from './dto/create-song.dto';
import { updateSongDto } from './dto/update-song.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song)
        private readonly songRepository: SongRepository,
    ){}

    async getAllSongs(): Promise<Song[]>{
        return await this.songRepository.find();
    }

    async createSong(createSongDto: createSongDto, user: User): Promise<Song>{
        const { title, year, genre } = createSongDto

        const song = this.songRepository.create({
            title,
            year,
            genre,
            user
        });

        await this.songRepository.save(song); //interaction with db happens here
        return song;
    }

    async getSongById(id: number, user: User): Promise<Song> {
        const song = await this.songRepository.findOneBy({
            id: id,  user
        });
        if(!song){
            throw new NotFoundException(`Song with ID ${id} not found`);
        }
        return song;
    }

    async updateSongById(id: number, updateSongDto: updateSongDto, user: User): Promise<{status: string, song?: Song}> {
        const song = await this.songRepository.findOneBy({id:id, user});

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

    async deleteSong(id: number, user: User): Promise<{status: string, song?: Song}> {
        const song = await this.songRepository.findOneBy({id:id, user});

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
