import { Controller, Get, Body, Param, Patch, Delete, Post, UseGuards } from '@nestjs/common';
import { Song } from './song.entity';
import { SongService } from './song.service';
import { createSongDto } from './dto/create-song.dto';
import { updateSongDto } from './dto/update-song.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/user/get-user.decorator';

@Controller('song')
@UseGuards(AuthGuard())
export class SongController {
    constructor(private readonly songService: SongService){}

    @Get()
    async getAllSongs(
        @GetUser() user: User
    ): Promise<Song[]> {
        return this.songService.getAllSongs();
    }

    @Post()
    async createSong(@Body() createSongDto: createSongDto, @GetUser() user: User): Promise<Song>{
        return this.songService.createSong(createSongDto, user)
    }

    @Get(":id")
    async getSongById(@Param("id") id: string, @GetUser() user: User): Promise<Song> {
        return this.songService.getSongById(Number(id), user);
    }

    @Patch(":id")
    async updateSongById(@Param("id") id: string, @Body() updateSongDto: updateSongDto, @GetUser() user: User): Promise<{status: string, song?: Song }> {
        return this.songService.updateSongById(Number(id), updateSongDto, user);
    }

    @Delete(":id")
    async deleteSong(@Param("id") id: string, @GetUser() user: User): Promise<{status: string, song?: Song}> {
        return this.songService.deleteSong(Number(id), user);
    }
}
