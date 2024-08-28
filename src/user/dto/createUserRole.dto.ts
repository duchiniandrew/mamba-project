import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    roleName: string;

    @IsNumber()
    @IsNotEmpty()
    id: number;

    constructor(data: Partial<CreateRoleDto>){
        Object.assign(this, data)
    }
}