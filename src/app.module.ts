import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';
import { RecordingCompanyModule } from './recording-company/recording-company.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

@Module({
  imports: [
    ArtistModule, 
    SongModule, 
    RecordingCompanyModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3030,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    })
  ]
})

export class AppModule {}
