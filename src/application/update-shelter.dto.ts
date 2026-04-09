import { IsString, IsOptional } from 'class-validator';

export class UpdateShelterDto {
    @IsOptional()
    @IsString()
    name?: string;
    
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
    ubicacion?: string;
    
    @IsOptional()
    @IsString()
    ciudad?: string;
    
    @IsOptional()
    @IsString()
    estado?: string;
    
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
