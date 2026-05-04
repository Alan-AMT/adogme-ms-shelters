import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Shelter, ShelterFindAll } from "../domain/shelter.entity.js";
import { ShelterRepository } from "../domain/shelter.repository.js";
import { CreateShelterDto } from "./create-shelter.dto.js";
import { UpdateShelterDto } from "./update-shelter.dto.js";
import { v4 as uuidv4 } from "uuid";
import { GetSheltersDto } from "./get-shelters.dto.js";

@Injectable()
export class SheltersService {
    constructor(
        private readonly shelterRepository: ShelterRepository,
    ) {}

    async getShelterById(id: string): Promise<Shelter> {
        // we dont expose the ownerId to the public
        return this.shelterRepository.findByIdPublic(id);
    }

    async getShelterByUserOwnerId(userOwnerId: string): Promise<Shelter> {
        return await this.shelterRepository.findByUserOwnerId(userOwnerId);
    }

    async createShelter(createShelterDto: CreateShelterDto): Promise<Shelter> {
        const date = new Date();
        const shelterToCreate = Shelter.create(
            {
                ...createShelterDto,
                id: uuidv4(),
                approved: false,
                status: 'pending',
                createdAt: date,
                updatedAt: date,
            }
        );
        await this.shelterRepository.create(shelterToCreate);
        return shelterToCreate;
    }

    async getAllShelters(getSheltersDto: GetSheltersDto): Promise<{ data: ShelterFindAll[], total: number, page: number, totalPages: number, limit: number }> {
        const { page = 1, limit = 12 } = getSheltersDto;
        const actualPage = page || 1;
        const actualLimit = limit || 12;

        const { data, total } = await this.shelterRepository.getAllShelters(actualPage, actualLimit);
        
        const totalPages = Math.ceil(total / actualLimit);

        return {
            data,
            total,
            page: actualPage,
            totalPages,
            limit: actualLimit
        };
    }

    async updateShelter(id: string, updateShelterDto: UpdateShelterDto, userId: string): Promise<Shelter> {
        const existingShelter = await this.shelterRepository.findById(id);
        if (!existingShelter) {
            throw new NotFoundException('Shelter not found');
        }
        if (existingShelter.userOwnerId !== userId) {
            throw new UnauthorizedException('Unauthorized to update this shelter');
        }
        const updatedShelter = Shelter.create({
            ...existingShelter,
            ...updateShelterDto,
            name: updateShelterDto.name ?? existingShelter.name,
            description: updateShelterDto.description ?? existingShelter.description,
            updatedAt: new Date(),
        });

        await this.shelterRepository.update(updatedShelter);
        return updatedShelter;
    }
}