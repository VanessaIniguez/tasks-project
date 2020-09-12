import { isNotEmpty, IsNotEmpty, Length, IsEmail, Matches, IsString } from 'class-validator';
export class CreateUserDto {

    @IsString()
    @Length(3, 
        50, 
        {message: "El nombre deben tener al menos 3 caracteres y máximo 50"})
    name: string;

    @Length(3, 
        50, 
        {message: "El apellido deben tener al menos 3 caracteres y máximo 50"})
    lastName: string;
    
    @IsNotEmpty()
    @Length(5, 
        30, 
        {message: "El nombre de usuario debe tener por lo menos 5 caracteres y máximo 30"})
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            {message: 'Por favor, ingrese una contrañesa segura'
    })
    password: string;

}