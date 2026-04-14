import { IsString, IsOptional } from 'class-validator';

export class CreateShelterDto {
    @IsString()
    userOwnerId: string;
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    @IsString()
    phone?: string;
    @IsOptional()
    @IsString()
    email?: string;
    @IsOptional()
    @IsString()
    website?: string;
    @IsOptional()
    @IsString()
    municipality?: string;
    @IsOptional()
    @IsString()
    fullAddress?: string;
    @IsOptional()
    @IsString()
    schedule?: string;
    @IsOptional()
    @IsString()
    facebook?: string;
    @IsOptional()
    @IsString()
    instagram?: string;
    @IsOptional()
    @IsString()
    twitter?: string;
    @IsOptional()
    @IsString()
    logo?: string;
    @IsOptional()
    @IsString()
    imageUrl?: string;
}