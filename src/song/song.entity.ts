import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    year: string;
}