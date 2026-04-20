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
                id: uuidv4(),
                userOwnerId: createShelterDto.userOwnerId,
                name: createShelterDto.name,
                description: createShelterDto.description ?? null,
                phone: createShelterDto.phone ?? null,
                email: createShelterDto.email ?? null,
                website: createShelterDto.website ?? null,
                municipality: createShelterDto.municipality ?? null,
                fullAddress: createShelterDto.fullAddress ?? null,
                schedule: createShelterDto.schedule ?? null,
                facebook: createShelterDto.facebook ?? null,
                instagram: createShelterDto.instagram ?? null,
                twitter: createShelterDto.twitter ?? null,
                approved: false,
                status: 'pending',
                logo: createShelterDto.logo ?? null,
                imageUrl: createShelterDto.imageUrl ?? null,
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
            id: existingShelter.id,
            userOwnerId: existingShelter.userOwnerId,
            name: updateShelterDto.name ?? existingShelter.name,
            description: updateShelterDto.description !== undefined ? updateShelterDto.description : existingShelter.description,
            phone: updateShelterDto.phone !== undefined ? updateShelterDto.phone : existingShelter.phone,
            email: updateShelterDto.email !== undefined ? updateShelterDto.email : existingShelter.email,
            website: updateShelterDto.website !== undefined ? updateShelterDto.website : existingShelter.website,
            municipality: updateShelterDto.municipality !== undefined ? updateShelterDto.municipality : existingShelter.municipality,
            fullAddress: updateShelterDto.fullAddress !== undefined ? updateShelterDto.fullAddress : existingShelter.fullAddress,
            schedule: updateShelterDto.schedule !== undefined ? updateShelterDto.schedule : existingShelter.schedule,
            facebook: updateShelterDto.facebook !== undefined ? updateShelterDto.facebook : existingShelter.facebook,
            instagram: updateShelterDto.instagram !== undefined ? updateShelterDto.instagram : existingShelter.instagram,
            twitter: updateShelterDto.twitter !== undefined ? updateShelterDto.twitter : existingShelter.twitter,
            approved: existingShelter.approved,
            status: existingShelter.status,
            logo: updateShelterDto.logo !== undefined ? updateShelterDto.logo : existingShelter.logo,
            imageUrl: updateShelterDto.imageUrl !== undefined ? updateShelterDto.imageUrl : existingShelter.imageUrl,
            createdAt: existingShelter.createdAt,
            updatedAt: new Date(),
        });

        await this.shelterRepository.update(updatedShelter);
        return updatedShelter;
    }
}