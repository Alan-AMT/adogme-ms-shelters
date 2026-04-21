import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateShelterDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsString()
    description: string | null = null;
    
    @IsOptional()
    @IsString()
    phone: string | null = null;
    
    @IsOptional()
    @IsString()
    email: string | null = null;
    
    @IsOptional()
    @IsString()
    website: string | null = null;
    
    @IsOptional()
    @IsString()
    municipality: string | null = null;
    
    @IsOptional()
    @IsString()
    fullAddress: string | null = null;
    
    @IsOptional()
    @IsString()
    schedule: string | null = null;
    
    @IsOptional()
    @IsString()
    facebook: string | null = null;
    
    @IsOptional()
    @IsString()
    instagram: string | null = null;
    
    @IsOptional()
    @IsString()
    twitter: string | null = null;
    
    @IsOptional()
    @IsString()
    logo: string | null = null;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsNumber()
    adoptionFee: number | null = null;
}
