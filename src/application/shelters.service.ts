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

    async updateShelter(id: string, updateShelterDto: UpdateShelterDto): Promise<Shelter> {
        const existingShelter = await this.shelterRepository.findById(id);
        const updatedShelter = Shelter.create({
            id: existingShelter.id,
            userId: existingShelter.userId,
            name: updateShelterDto.name ?? existingShelter.name,
            description: updateShelterDto.description !== undefined ? updateShelterDto.description : existingShelter.description,
            phone: updateShelterDto.phone !== undefined ? updateShelterDto.phone : existingShelter.phone,
            email: updateShelterDto.email !== undefined ? updateShelterDto.email : existingShelter.email,
            website: updateShelterDto.website !== undefined ? updateShelterDto.website : existingShelter.website,
            ubicacion: updateShelterDto.ubicacion !== undefined ? updateShelterDto.ubicacion : existingShelter.ubicacion,
            ciudad: updateShelterDto.ciudad !== undefined ? updateShelterDto.ciudad : existingShelter.ciudad,
            estado: updateShelterDto.estado !== undefined ? updateShelterDto.estado : existingShelter.estado,
            facebook: updateShelterDto.facebook !== undefined ? updateShelterDto.facebook : existingShelter.facebook,
            instagram: updateShelterDto.instagram !== undefined ? updateShelterDto.instagram : existingShelter.instagram,
            twitter: updateShelterDto.twitter !== undefined ? updateShelterDto.twitter : existingShelter.twitter,
            aprobado: existingShelter.aprobado,
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