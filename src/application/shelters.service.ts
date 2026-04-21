import { Injectable } from "@nestjs/common";
import { Shelter } from "../domain/shelter.entity.js";
import { ShelterRepository } from "../domain/shelter.repository.js";
import { CreateShelterDto } from "./create-shelter.dto.js";
import { UpdateShelterDto } from "./update-shelter.dto.js";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class SheltersService {
    constructor(
        private readonly shelterRepository: ShelterRepository,
    ) {}

    async getShelterById(id: string): Promise<Shelter> {
        return this.shelterRepository.findById(id);
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

    async getAllShelters(): Promise<Shelter[]> {
        return this.shelterRepository.getAllShelters()
    }

    async updateShelter(id: string, updateShelterDto: UpdateShelterDto, userId: string): Promise<Shelter> {
        const existingShelter = await this.shelterRepository.findById(id);
        if (existingShelter.userOwnerId !== userId) {
            throw new Error('Unauthorized');
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