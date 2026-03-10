export class Shelter {
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly name: string,
        public readonly description: string | null,
        public readonly address: string | null,
        public readonly phone: string | null,
        public readonly email: string | null,
        public readonly website: string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    public static create( shelterData: {
        id: string,
        userId: string,
        name: string,
        description: string | null,
        address: string | null,
        phone: string | null,
        email: string | null,
        website: string | null,
        createdAt: Date,
        updatedAt: Date,
    }): Shelter {
        return new Shelter(
            shelterData.id,
            shelterData.userId,
            shelterData.name,
            shelterData.description,
            shelterData.address,
            shelterData.phone,
            shelterData.email,
            shelterData.website,
            shelterData.createdAt,
            shelterData.updatedAt,
        );
    }
}