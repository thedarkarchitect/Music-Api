import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';
import { RecordingCompanyModule } from './recording-company/recording-company.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ArtistModule, SongModule, RecordingCompanyModule, UserModule],
})
export class AppModule {}
