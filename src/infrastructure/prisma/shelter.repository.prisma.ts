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
            id: shelter.id,
            userOwnerId: "",
            name: shelter.name,
            description: shelter.description,
            phone: shelter.phone,
            email: shelter.email,
            website: shelter.website,
            municipality: shelter.municipality,
            fullAddress: shelter.fullAddress,
            schedule: shelter.schedule,
            facebook: shelter.facebook,
            instagram: shelter.instagram,
            twitter: shelter.twitter,
            approved: shelter.approved,
            status: shelter.status as ShelterStatus,
            logo: shelter.logo,
            imageUrl: shelter.imageUrl,
            adoptionFee: shelter.adoptionFee,
            createdAt: shelter.createdAt,
            updatedAt: shelter.updatedAt,
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
            id: shelter.id,
            userOwnerId: shelter.userOwnerId,
            name: shelter.name,
            description: shelter.description,
            phone: shelter.phone,
            email: shelter.email,
            website: shelter.website,
            municipality: shelter.municipality,
            fullAddress: shelter.fullAddress,
            schedule: shelter.schedule,
            facebook: shelter.facebook,
            instagram: shelter.instagram,
            twitter: shelter.twitter,
            approved: shelter.approved,
            status: shelter.status as ShelterStatus,
            logo: shelter.logo,
            imageUrl: shelter.imageUrl,
            adoptionFee: shelter.adoptionFee,
            createdAt: shelter.createdAt,
            updatedAt: shelter.updatedAt,
        });
    }

    async create(shelter: Shelter): Promise<void> {
        await this.prisma.shelter.create({
            data: {
                id: shelter.id,
                userOwnerId: shelter.userOwnerId,
                name: shelter.name,
                description: shelter.description,
                phone: shelter.phone,
                email: shelter.email,
                website: shelter.website,
                municipality: shelter.municipality,
                fullAddress: shelter.fullAddress,
                schedule: shelter.schedule,
                facebook: shelter.facebook,
                instagram: shelter.instagram,
                twitter: shelter.twitter,
                approved: shelter.approved,
                status: shelter.status as any,
                logo: shelter.logo,
                imageUrl: shelter.imageUrl,
                createdAt: shelter.createdAt,
                updatedAt: shelter.updatedAt,
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
        await this.prisma.shelter.update({
            where: { id: shelter.id },
            data: {
                userOwnerId: shelter.userOwnerId,
                name: shelter.name,
                description: shelter.description,
                phone: shelter.phone,
                email: shelter.email,
                website: shelter.website,
                municipality: shelter.municipality,
                fullAddress: shelter.fullAddress,
                schedule: shelter.schedule,
                facebook: shelter.facebook,
                instagram: shelter.instagram,
                twitter: shelter.twitter,
                approved: shelter.approved,
                status: shelter.status as any,
                logo: shelter.logo,
                imageUrl: shelter.imageUrl,
                updatedAt: shelter.updatedAt,
            },
        });
    }
}
