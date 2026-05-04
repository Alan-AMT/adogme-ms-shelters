import { Shelter, ShelterFindAll } from "./shelter.entity.js";

export abstract class ShelterRepository {
    abstract findById(id: string): Promise<Shelter>;
    abstract findByIdPublic(id: string): Promise<Shelter>;
    abstract findByUserOwnerId(userOwnerId: string): Promise<Shelter>;
    abstract create(shelter: Shelter): Promise<void>;
    abstract update(shelter: Shelter): Promise<void>;
    abstract getAllShelters(page: number | null, limit: number | null): Promise<{ data: ShelterFindAll[], total: number }>;
}