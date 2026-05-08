export abstract class DogsPort {
    abstract updateDogsShelterData(shelterId: string, shelterName: string, shelterLogo: string): Promise<void>;
}
