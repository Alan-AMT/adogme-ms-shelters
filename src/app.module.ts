import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller.js';
import { PrismaService } from './infrastructure/prisma/prisma.service.js';
import { PrismaShelterRepository } from './infrastructure/prisma/shelter.repository.prisma.js';
import { SheltersService } from './application/shelters.service.js';
import { ShelterRepository } from './domain/shelter.repository.js';
import { CloudStorageAdapter } from './infrastructure/cloud-storage/cloud.storage.adapter.js';
import { ImagesPort } from './domain/storage.port.js';
import { SheltersEventListener } from './application/shelters-events.listener.js';
import { DogsPort } from './domain/dogs.port.js';
import { DogsAdapter } from './infrastructure/dogs-microservice/dogs.adapter.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    SheltersService, 
    PrismaService,
    SheltersEventListener,
    {
      provide: ShelterRepository,
      useClass: PrismaShelterRepository
    },
    {
      provide: ImagesPort,
      useClass: CloudStorageAdapter
    },
    {
      provide: DogsPort,
      useClass: DogsAdapter
    },
  ],
})
export class AppModule { }
