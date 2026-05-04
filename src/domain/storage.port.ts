export abstract class ImagesPort {
    abstract generateUploadLinks(shelterId: string, imageIds: string[]): Promise<string[]>;
}