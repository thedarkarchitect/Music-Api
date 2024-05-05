import { Entity, EntityRepository, Repository } from "typeorm";
import { Artist } from "./artist.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateArtistDto } from "./dto/create-artist.dto";

EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {}

