import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
