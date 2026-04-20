import { Shelter } from "./shelter.entity.js";

export abstract class ShelterRepository {
    abstract findById(id: string): Promise<Shelter>;
    abstract findByUserOwnerId(userOwnerId: string): Promise<Shelter>;
    abstract create(shelter: Shelter): Promise<void>;
    abstract update(shelter: Shelter): Promise<void>;
    abstract getAllShelters(): Promise<Shelter[]>;
}