import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RecordingCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyName: string;

    @Column()
    yearFounded: string;

    @Column()
    headQuarters: string;
}