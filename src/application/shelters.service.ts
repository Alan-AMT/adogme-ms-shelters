import { Injectable } from "@nestjs/common";
import { Shelter } from "../domain/shelter.entity.js";
import { ShelterRepository } from "../domain/shelter.repository.js";
import { CreateShelterDto } from "./create-shelter.dto.js";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class SheltersService {
    constructor(
        private readonly shelterRepository: ShelterRepository,
    ) {}

    async getShelterById(id: string): Promise<Shelter> {
        return this.shelterRepository.findById(id);
    }

    async createShelter(createShelterDto: CreateShelterDto): Promise<Shelter> {
        const date = new Date();
        const shelterToCreate = Shelter.create(
            {
                id: uuidv4(),
                userId: createShelterDto.userId,
                name: createShelterDto.name,
                description: createShelterDto.description ?? null,
                phone: createShelterDto.phone ?? null,
                email: createShelterDto.email ?? null,
                website: createShelterDto.website ?? null,
                ubicacion: createShelterDto.ubicacion ?? null,
                ciudad: createShelterDto.ciudad ?? null,
                estado: createShelterDto.estado ?? null,
                facebook: createShelterDto.facebook ?? null,
                instagram: createShelterDto.instagram ?? null,
                twitter: createShelterDto.twitter ?? null,
                aprobado: false,
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
}