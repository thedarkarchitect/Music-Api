import { Controller, Body, Param, Get, Patch, Post, Delete } from '@nestjs/common';
import { RecordingCompanyService } from './recording-company.service';
import { RecordingCompany } from './recording-company.entity';
import { createRecordingCompanyDto } from './dto/create-recordingCompany.dto';
import { updateRecordingCompanyDto } from './dto/update-recordingCompany.dto';

@Controller('recording-company')
export class RecordingCompanyController {
    constructor(private readonly recordingCompanyService: RecordingCompanyService){}

    @Get()
    async getAllCompanies(): Promise<RecordingCompany[]> {
        return this.recordingCompanyService.getAllCompanies()
    }

    @Post()
    async createCompany(@Body() createRecordingCompanyDto: createRecordingCompanyDto): Promise<RecordingCompany>{
        return this.recordingCompanyService.createCompany(createRecordingCompanyDto)
    }

    @Get(":id")
    async getCompanyById(@Param("id") id: string): Promise<RecordingCompany> {
        return this.recordingCompanyService.getCompanyById(Number(id));
    }

    @Patch(":id")
    async updateCompanyById(@Param("id") id: string, @Body() updateRecordingCompanyDto: updateRecordingCompanyDto): Promise<{status: string, company?: RecordingCompany }> {
        return this.recordingCompanyService.updateCompanyById(Number(id), updateRecordingCompanyDto);
    }

    @Delete(":id")
    async deleteCompany(@Param("id") id: string): Promise<{status: string, company?: RecordingCompany}> {
        return this.recordingCompanyService.deleteCompany(Number(id));
    }
}
