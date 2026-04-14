import { IsString } from 'class-validator';

export class CreateShelterDto {
    @IsString()
    userOwnerId: string;
    @IsString()
    name: string;
    @IsString()
    description?: string;
    @IsString()
    phone?: string;
    @IsString()
    email?: string;
    @IsString()
    website?: string;
    @IsString()
    municipality?: string;
    @IsString()
    fullAddress?: string;
    @IsString()
    schedule?: string;
    @IsString()
    facebook?: string;
    @IsString()
    instagram?: string;
    @IsString()
    twitter?: string;
    @IsString()
    logo?: string;
    @IsString()
    imageUrl?: string;
}