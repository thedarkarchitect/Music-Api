import { Module } from '@nestjs/common';
import { RecordingCompanyController } from './recording-company.controller';
import { RecordingCompanyService } from './recording-company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordingCompany } from './recording-company.entity';
import { RecordingCompanyRepository } from './recording-company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecordingCompany, RecordingCompanyRepository])],
  controllers: [RecordingCompanyController],
  providers: [RecordingCompanyService]
})
export class RecordingCompanyModule {}
