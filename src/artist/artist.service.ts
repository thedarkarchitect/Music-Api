import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistRepository } from './artist.repository';
import { UpdateArtistDto } from './dto/update-artist.dto';


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

        await this.artistRepository.save(artist);
        return artist;
    }

    async getArtistById(id: number): Promise<Artist> {
        const artistExists = await this.artistRepository.findOneBy({
            id: id
        })
        if(!artistExists){
            throw new NotFoundException(`Artist with ID ${id} not found`)
        }
        return artistExists;
    }

    async updateArtist(id: number, updateArtistDto: UpdateArtistDto): Promise<string> {
        const artist = this.getArtistById(id);
        const update = await this.artistRepository.update((await artist).id ,updateArtistDto);
        if(update){
            return "Artist updated"
        } else {
            return "Artist was not updated"
        }
    }   

    async deleteArtist(id: number): Promise<string> {
        const deleted = await this.artistRepository.delete(id);
        if(deleted){
            return "Artist Deleted"
        } else {
            return "Artist unsuccessful delete"
        }
    }
}
