import { Controller, Get, Body, Param, Patch, Delete, Post, UseGuards } from '@nestjs/common';
import { Song } from './song.entity';
import { SongService } from './song.service';
import { createSongDto } from './dto/create-song.dto';
import { updateSongDto } from './dto/update-song.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('song')
@UseGuards(AuthGuard())
export class SongController {
    constructor(private readonly songService: SongService){}

    @Get()
    getAllSongs(): Promise<Song[]> {
        return this.songService.getAllSongs();
    }

    @Post()
    createSong(@Body() createSongDto: createSongDto): Promise<Song>{
        return this.songService.createSong(createSongDto)
    }

    @Get(":id")
    getSongById(@Param("id") id: string): Promise<Song> {
        return this.songService.getSongById(Number(id));
    }

    @Patch(":id")
    updateSongById(@Param("id") id: string, @Body() updateSongDto: updateSongDto): Promise<{status: string, song?: Song }> {
        return this.songService.updateSongById(Number(id), updateSongDto);
    }

    @Delete(":id")
    async deleteSong(@Param("id") id: string): Promise<{status: string, song?: Song}> {
        return this.songService.deleteSong(Number(id));
    }
}
