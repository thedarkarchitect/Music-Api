import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongRepository } from './song.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Song } from './song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), AuthModule],
  controllers: [SongController],
  providers: [SongService, SongRepository]
})
export class SongModule {}
