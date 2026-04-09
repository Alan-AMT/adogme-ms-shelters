import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SheltersService } from './application/shelters.service.js';
import { Shelter } from './domain/shelter.entity.js';
import { CreateShelterDto } from './application/create-shelter.dto.js';
import { UpdateShelterDto } from './application/update-shelter.dto.js';

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

  @Put("shelter/:id")
  async updateShelter(
    @Param("id") id: string,
    @Body() updateShelterDto: UpdateShelterDto,
  ): Promise<Shelter> {
    return this.sheltersService.updateShelter(id, updateShelterDto);
  }
}
