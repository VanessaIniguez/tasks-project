import { Length, IsNotEmpty } from "class-validator";

export class CreateProjectDto {

    
    @IsNotEmpty({
        message: "Name shouldn't be empty"
      })
    @Length(3,
        50, 
        {message: "Name must have at lleast 3 characters and a maximum of 50"})
    name: string;

    @IsNotEmpty({
      message: "Description shouldn't be empty"
    })
    @Length(3, 
      50, 
      {message: "Project should have a description"})
    description: string;

    
}