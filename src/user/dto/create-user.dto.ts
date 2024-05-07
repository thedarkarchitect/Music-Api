import { IsString, MaxLength, MinLength } from "class-validator";

export class createUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(2)
    name: string;
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;
    country: string;
    born: string;
    gender: string;
}