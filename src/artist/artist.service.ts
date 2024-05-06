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

    async updateArtist(id: number, updateArtistDto: UpdateArtistDto): Promise<{status: string, artist?: Artist}> {
        const artist = await this.artistRepository.findOneBy({id:id}) //gets the artist by id

        if(!artist){//artist does not exist
            throw new NotFoundException(`Artist with this ID ${id} not found.`)
        }

        Object.assign(artist, updateArtistDto);//will update artist fields right away by comparing the two objects
        
        const update = await this.artistRepository.save(artist)//this updates the artist in the db
        if(update){
            return {status: "Artist updated", artist: update}
        } else {
            return {status: "Artist not updated successfully"}
        }
    }   

    async deleteArtist(id: number): Promise<{status: string, artist?: Artist}> {
        const artist = await this.artistRepository.findOneBy({id:id});

        if(!artist) {
            throw new NotFoundException(`Artist with this ID ${id} not found.`)
        }

        const deleted = await this.artistRepository.delete(id);

        if(deleted){
            return {status: "Artist deleted succcessfully", artist: artist}
        } else {
            return { status: "Artist not deleted"}
        }
    }
}
