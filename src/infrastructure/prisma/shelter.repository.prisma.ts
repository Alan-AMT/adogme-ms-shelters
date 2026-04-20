import { Injectable } from "@nestjs/common";
import { ShelterRepository } from "../../domain/shelter.repository.js";
import { PrismaService } from "./prisma.service.js";
import { Shelter, ShelterStatus } from "../../domain/shelter.entity.js";

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
        });

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

    async getAllShelters(): Promise<Shelter[]>{
        const shelters = await this.prisma.shelter.findMany()
        const mapped = shelters.map(shelter => Shelter.create({
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
            createdAt: shelter.createdAt,
            updatedAt: shelter.updatedAt,
        }))
        return mapped
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
