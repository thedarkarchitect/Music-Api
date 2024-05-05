import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private readonly artistRepository: ArtistRepository,
    ){}

    async getAllArtists(): Promise<Artist[]> {
        return await this.artistRepository.find()
    }

    async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
        const { name, country, born, genre, gender } = createArtistDto;

        const artist = this.artistRepository.create({
            name,
            country,
            born,
            genre,
            gender,
        });

        return await this.artistRepository.save(artist);
    }
}
