import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateShelterDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description: string;
    
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
    mapIframe: string | null = null;
    
    @IsOptional()
    newLogo: boolean | null = null;
    
    @IsOptional()
    newImageUrl: boolean | null = null;

    @IsOptional()
    @IsNumber()
    adoptionFee: number | null = null;

    @IsBoolean()
    @IsOptional()
    acceptsDonations: boolean = true;

    @IsString()
    @IsOptional()
    donationCauseText: string | null = null;

    @IsString()
    @IsOptional()
    donationClabe: string | null = null;

    @IsString()
    @IsOptional()
    donationBankName: string | null = null;

    @IsString()
    @IsOptional()
    donationAccountHolder: string | null = null;

    @IsString()
    @IsOptional()
    donationPaypalLink: string | null = null;

    @IsString()
    @IsOptional()
    donationMercadoPagoLink: string | null = null;
}
