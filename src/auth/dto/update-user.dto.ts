import { IsString, MaxLength, MinLength } from "class-validator";
import { UserGender } from "./user-gender.enum";

export class updateUserDto {
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
    genre: string;
    gender: UserGender;
}