import { IsString, MaxLength, MinLength } from "class-validator";
import { UserGender } from "./user-gender.enum";

export class createUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    name: string;
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    password: string;
    country: string;
    born: string;
    gender: UserGender;
}