import { EntityRepository, Repository } from "typeorm";
import { RecordingCompany } from "./recording-company.entity";

EntityRepository(RecordingCompany)
export class RecordingCompanyRepository extends Repository<RecordingCompany>{}