import { IsString, MaxLength, MinLength } from "class-validator";

export class authUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    name: string;
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    password: string;
}