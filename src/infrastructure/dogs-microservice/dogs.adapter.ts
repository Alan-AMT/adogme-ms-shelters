import { GoogleAuth } from "google-auth-library";
import { Injectable } from "@nestjs/common";
import { decode, JwtPayload } from "jsonwebtoken";
import { DogsPort } from "../../domain/dogs.port.js";

@Injectable()
export class DogsAdapter implements DogsPort {
    dogsServiceToken: string;

    async updateDogsShelterData(shelterId: string, shelterName: string, shelterLogo: string): Promise<void> {
        try {
            if (this.checkTokenExpired()) {
                await this.refreshTokenClient();
            }
            const response = await fetch(`${process.env.DOGS_SERVICE_URL}/dogs/shelter/${shelterId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.dogsServiceToken}`
                },
                body: JSON.stringify({ shelterName, shelterLogo }),
            });
            if (!response.ok) {
                throw new Error(`Dogs service error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update dogs shelter data in Dogs service");
        }
    }

    checkTokenExpired(): boolean {
        if (!this.dogsServiceToken) return true;
        const decodedToken = decode(this.dogsServiceToken) as JwtPayload;
        const currentTime = Date.now() / 1000;
        return decodedToken.exp! < currentTime;
    }

    async refreshTokenClient(): Promise<void> {
        try {
            const auth = new GoogleAuth();
            let audience = process.env.DOGS_SERVICE_AUDIENCE || "";
            if (!audience && process.env.DOGS_SERVICE_URL) {
                try {
                    const url = new URL(process.env.DOGS_SERVICE_URL);
                    audience = url.origin;
                } catch (e) {
                    audience = process.env.DOGS_SERVICE_URL;
                }
            }
            const client = await auth.getIdTokenClient(audience);
            const token = await client.idTokenProvider.fetchIdToken(audience);
            this.dogsServiceToken = token;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to refresh Dogs service token");
        }
    }
}
