import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { SheltersService } from './application/shelters.service.js';
import { Shelter } from './domain/shelter.entity.js';
import { CreateShelterDto } from './application/create-shelter.dto.js';
import { UpdateShelterDto } from './application/update-shelter.dto.js';
import { User } from './infrastructure/security/user.decorator.js';
import { Roles } from './infrastructure/security/roles.decorator.js';
import { UserAuthorizationGuard } from './infrastructure/security/user.authorization.guard.js';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller()
export class AppController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get("shelter/:id")
  async getShelter(
    @Param("id") id: string,
  ): Promise<Shelter> {
    return this.sheltersService.getShelterById(id);
  }

  @Post("shelter")
  async createShelter(
    @Body() createShelterDto: CreateShelterDto,
  ): Promise<Shelter> {
    return this.sheltersService.createShelter(createShelterDto);
  }

  @Get("shelters")
  async getAllShelters(): Promise<Shelter[]>{
    return this.sheltersService.getAllShelters()
  }

  @UseGuards(UserAuthorizationGuard)
  @Roles('SHELTER')
  @Put("shelter/:id")
  async updateShelter(
    @Param("id") id: string,
    @Body() updateShelterDto: UpdateShelterDto,
    @User("sub") userId: string,
  ): Promise<Shelter> {
    return this.sheltersService.updateShelter(id, updateShelterDto, userId);
  }
}
