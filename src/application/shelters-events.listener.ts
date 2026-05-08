import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DogsPort } from '../domain/dogs.port.js';

@Injectable()
export class SheltersEventListener {
  private readonly logger = new Logger(SheltersEventListener.name);

  constructor(private readonly dogsPort: DogsPort) {}

  @OnEvent('shelter.updated', { async: true })
  async handleShelterUpdated(payload: { shelterId: string; shelterName: string; shelterLogo: string }) {
    try {
      await this.dogsPort.updateDogsShelterData(
        payload.shelterId,
        payload.shelterName,
        payload.shelterLogo
      );
      this.logger.log(`Successfully updated dogs for shelter ${payload.shelterId}`);
    } catch (error) {
      this.logger.error(`Failed to update dogs for shelter ${payload.shelterId}: ${error.message}`, error.stack);
    }
  }
}
