import { Injectable } from "@nestjs/common";
import { ShelterRepository } from "../../domain/shelter.repository.js";
import { PrismaService } from "./prisma.service.js";
import { Shelter, ShelterFindAll, ShelterStatus } from "../../domain/shelter.entity.js";

@Injectable()
export class PrismaShelterRepository implements ShelterRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}
    
    async findById(id: string): Promise<Shelter> {
        const shelter = await this.prisma.shelter.findUnique({
            where: {
                id,
            },
            // we dont expose the ownerId to the public
            omit: {
                userOwnerId: true
            }
        });

        if (!shelter) {
            throw new Error("Shelter not found");
        }

        return Shelter.create({
            ...shelter,
            userOwnerId: "",
        });
    }

    async findByUserOwnerId(userOwnerId: string): Promise<Shelter> {
        const shelter = await this.prisma.shelter.findFirst({
            where: {
                userOwnerId: userOwnerId
            }
        })

        if (!shelter) {
            throw new Error("Shelter not found");
        }

        return Shelter.create({
            ...shelter,
        });
    }

    async create(shelter: Shelter): Promise<void> {
        await this.prisma.shelter.create({
            data: {
                ...shelter,
            },
        });
    }

    async getAllShelters(page: number | null, limit: number | null): Promise<{ data: ShelterFindAll[], total: number }>{
        const total = await this.prisma.shelter.count();
        
        const take = limit || 12;
        const skip = page ? (page - 1) * take : 0;

        const shelters = await this.prisma.shelter.findMany({
            where: {
                approved: true,
                status: 'approved'
            },
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                municipality: true,
                fullAddress: true,
                schedule: true,
                logo: true,
                imageUrl: true,
            }
        });
        
        return { data: shelters, total };
    }

    async update(shelter: Shelter): Promise<void> {
        const { userOwnerId, ...data } = shelter;
        await this.prisma.shelter.update({
            where: { id: shelter.id },
            data: {
                ...data
            },
        });
    }
}
