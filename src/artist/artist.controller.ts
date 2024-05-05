import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService){}

    @Get()
    async getAllArtists(): Promise<Artist[]>{
        return this.artistService.getAllArtists();
    }

    @Post()
    async createArtist(@Body() createArtistDto: CreateArtistDto ): Promise<Artist> {
        return this.artistService.createArtist(createArtistDto)
    }

    @Get(":id")
    async getArtistById(@Param("id") id: string): Promise<Artist> {
        return await this.artistService.getArtistById(Number(id));
    }


    @Patch(":id")
    async updateArtist(@Param("id") id: string, @Body() updateArtistDto: UpdateArtistDto): Promise<string> {
        return await this.artistService.updateArtist(Number(id), updateArtistDto)
    }

    @Delete(":id")
    async deleteArtist(@Param("id") id: string): Promise<string>{
        return await this.artistService.deleteArtist(Number(id));
    }
}
