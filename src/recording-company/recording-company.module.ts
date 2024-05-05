import { Module } from '@nestjs/common';
import { RecordingCompanyController } from './recording-company.controller';

@Module({
  controllers: [RecordingCompanyController]
})
export class RecordingCompanyModule {}
