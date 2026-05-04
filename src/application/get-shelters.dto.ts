import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class GetSheltersDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number | null = null;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number | null = 12;
}
