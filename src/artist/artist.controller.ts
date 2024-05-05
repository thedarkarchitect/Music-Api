import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';

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
}
