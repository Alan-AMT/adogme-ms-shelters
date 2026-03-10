import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { PrismaService } from './infrastructure/prisma/prisma.service.js';
import { PrismaShelterRepository } from './infrastructure/prisma/shelter.repository.prisma.js';
import { SheltersService } from './application/shelters.service.js';
import { ShelterRepository } from './domain/shelter.repository.js';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [SheltersService, PrismaService,
    { provide: ShelterRepository, useClass: PrismaShelterRepository }],
})
export class AppModule {}
