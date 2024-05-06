import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordingCompany } from './recording-company.entity';
import { RecordingCompanyRepository } from './recording-company.repository';
import { createRecordingCompanyDto } from './dto/create-recordingCompany.dto';
import { updateRecordingCompanyDto } from './dto/update-recordingCompany.dto';

@Injectable()
export class RecordingCompanyService {
    constructor(
        @InjectRepository(RecordingCompany)
        private readonly recordingCompanyRepository: RecordingCompanyRepository,
    ){}

    async getAllCompanies(): Promise<RecordingCompany[]>{
        return await this.recordingCompanyRepository.find();
    }

    async createCompany(createRecordingCompanyDto: createRecordingCompanyDto): Promise<RecordingCompany>{
        const { companyName, yearFounded, headQuarters } = createRecordingCompanyDto

        const recordingCompany = this.recordingCompanyRepository.create({ //this fill the fields in the db
            companyName,
            yearFounded,
            headQuarters
        });

        await this.recordingCompanyRepository.save(recordingCompany); //interaction with db happens here
        return recordingCompany;
    }

    async getCompanyById(id: number): Promise<RecordingCompany> {
        const company = await this.recordingCompanyRepository.findOneBy({
            id: id
        });
        if(!company){
            throw new NotFoundException(`Recording company with ID ${id} not found`);
        }
        return company;
    }

    async updateCompanyById(id: number, updateRecordingCompanyDto: updateRecordingCompanyDto): Promise<{status: string, company?: RecordingCompany}> {
        const company = await this.recordingCompanyRepository.findOneBy({id:id});

        if(!company) {
            throw new NotFoundException(`Company with this ID ${id} not found.`)
        }

        Object.assign(company, updateRecordingCompanyDto);
        const updatedCompany = await this.recordingCompanyRepository.save(company);
        if(updatedCompany) {
            return {status: "Company updated", company: company};
        } else {
            return {status: "Company was not updated"};
        }
    }

    async deleteCompany(id: number): Promise<{status: string, company?: RecordingCompany}> {
        const company = await this.recordingCompanyRepository.findOneBy({id:id});

        if(!company) {
            throw new NotFoundException(`Company with this ID ${id} not found.`)
        }

        const deleted = await this.recordingCompanyRepository.delete(id);
        if(deleted){
            return {status: "Company deleted succcessfully", company: company} 
        } else {
            return {status: "Company not deleted"}
        }
    }
}
