import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Shelter, ShelterFindAll } from "../domain/shelter.entity.js";
import { ShelterRepository } from "../domain/shelter.repository.js";
import { CreateShelterDto } from "./create-shelter.dto.js";
import { UpdateShelterDto } from "./update-shelter.dto.js";
import { v4 as uuidv4 } from "uuid";
import { GetSheltersDto } from "./get-shelters.dto.js";
import { ImagesPort } from "../domain/storage.port.js";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class SheltersService {
    constructor(
        private readonly shelterRepository: ShelterRepository,
        private readonly imagesService: ImagesPort,
        private readonly configService: ConfigService,
        private readonly eventEmitter: EventEmitter2,
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

    async getAllSheltersCompleteData(): Promise<Shelter[]> {
        return this.shelterRepository.getAllSheltersCompleteData();
    }

    async updateShelter(id: string, updateShelterDto: UpdateShelterDto, userId: string): Promise<{shelter: Shelter, uploadUrls?: string[]}> {
        const existingShelter = await this.shelterRepository.findById(id);
        if (!existingShelter) {
            throw new NotFoundException('Shelter not found');
        }
        if (existingShelter.userOwnerId !== userId) {
            throw new UnauthorizedException('Unauthorized to update this shelter');
        }
        const { newLogo, newImageUrl, ...data } = updateShelterDto;
        let dataToUpdate = {...data}
        if (newLogo) {
            dataToUpdate['logo'] = this.createImageUrls(id, "logo")
        }
        if (newImageUrl) {
            dataToUpdate['imageUrl'] = this.createImageUrls(id, "portrait")
        }
        const updatedShelter = Shelter.create({
            ...existingShelter,
            ...dataToUpdate,
            updatedAt: new Date(),
        });

        const [uploadUrls] = await Promise.all([
            this.imagesService.generateUploadLinks(id, [
                ...(dataToUpdate['logo'] ? ["logo"] : []),
                ...(dataToUpdate['imageUrl'] ? ["portrait"] : [])
            ]),
            this.shelterRepository.update(updatedShelter)
        ])

        const nameChanged = dataToUpdate['name'] !== undefined && dataToUpdate['name'] !== existingShelter.name;
        const logoChanged = dataToUpdate['newLogo'] !== null && dataToUpdate['newLogo'];

        if (nameChanged || logoChanged) {
            this.eventEmitter.emit('shelter.updated', {
                shelterId: updatedShelter.id,
                shelterName: updatedShelter.name,
                shelterLogo: updatedShelter.logo,
            });
        }

        return {shelter: updatedShelter, uploadUrls: uploadUrls};
    }

    createImageUrls(shelterId: string, type: 'logo' | 'portrait'): string {
        const BUCKET_NAME_PUBLIC = this.configService.get<string>('BUCKET_NAME_PUBLIC');
        return `https://storage.googleapis.com/${BUCKET_NAME_PUBLIC}/${shelterId}/${type}.jpg?v=${Date.now()}`;
    }
}