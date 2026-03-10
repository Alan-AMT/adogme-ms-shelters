import { IsString } from 'class-validator';

export class CreateShelterDto {
    @IsString()
    userId: string;
    @IsString()
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
}