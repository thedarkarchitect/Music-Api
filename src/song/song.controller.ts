import { Controller, Get, Body, Param, Patch, Delete, Post } from '@nestjs/common';
import { Song } from './song.entity';
import { SongService } from './song.service';
import { createSongDto } from './dto/create-song.dto';
import { updateSongDto } from './dto/update-song.dto';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService){}

    @Get()
    async getAllSongs(): Promise<Song[]> {
        return this.songService.getAllSongs();
    }

    @Post()
    async createSong(@Body() createSongDto: createSongDto): Promise<Song>{
        return this.songService.createSong(createSongDto)
    }

    @Get(":id")
    async getSongById(@Param("id") id: string): Promise<Song> {
        return this.songService.getSongById(Number(id));
    }

    @Patch(":id")
    async updateSongById(@Param("id") id: string, @Body() updateSongDto: updateSongDto): Promise<{status: string, song?: Song }> {
        return this.songService.updateSongById(Number(id), updateSongDto);
    }

    @Delete(":id")
    async deleteSong(@Param("id") id: string): Promise<{status: string, song?: Song}> {
        return this.songService.deleteSong(Number(id));
    }
}
