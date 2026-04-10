import { IsString } from 'class-validator';

export class CreateShelterDto {
    @IsString()
    userId: string;
    @IsString()
    name: string;
    description?: string;
    phone?: string;
    email?: string;
    website?: string;
    ubicacion?: string;
    ciudad?: string;
    estado?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    logo?: string;
    imageUrl?: string;
}