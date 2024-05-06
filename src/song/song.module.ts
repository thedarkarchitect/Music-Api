import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongRepository } from './song.repository';
import { Song } from './song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, SongRepository])],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
