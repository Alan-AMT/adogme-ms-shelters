import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { SheltersService } from './application/shelters.service.js';
import { Shelter, ShelterFindAll } from './domain/shelter.entity.js';
import { CreateShelterDto } from './application/create-shelter.dto.js';
import { UpdateShelterDto } from './application/update-shelter.dto.js';
import { User } from './infrastructure/security/user.decorator.js';
import { Roles } from './infrastructure/security/roles.decorator.js';
import { UserAuthorizationGuard } from './infrastructure/security/user.authorization.guard.js';
import { GetSheltersDto } from './application/get-shelters.dto.js';

@Controller('shelters-ms')
@UsePipes(new ValidationPipe({ transform: true }))
export class AppController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get("shelter/:id")
  async getShelter(
    @Param("id") id: string,
  ): Promise<Shelter> {
    return this.sheltersService.getShelterById(id);
  }

  @UseGuards(UserAuthorizationGuard)
  @Roles('shelter')
  @Get("shelter/user/:userOwnerId")
  async getShelterByUserOwnerId(
    @Param("userOwnerId") userOwnerId: string,
  ): Promise<Shelter> {
    return this.sheltersService.getShelterByUserOwnerId(userOwnerId);
  }

  @UseGuards(UserAuthorizationGuard)
  @Post("shelter")
  @Roles('shelter')
  async createShelter(
    @Body() createShelterDto: CreateShelterDto,
  ): Promise<Shelter> {
    return this.sheltersService.createShelter(createShelterDto);
  }

  @Get("shelters")
  async getAllShelters(
    @Query() getSheltersDto: GetSheltersDto
  ): Promise<{ data: ShelterFindAll[], total: number, page: number, totalPages: number, limit: number }>{
    return this.sheltersService.getAllShelters(getSheltersDto);
  }

  @UseGuards(UserAuthorizationGuard)
  @Put("shelter/:id")
  @Roles('shelter')
  async updateShelter(
    @Param("id") id: string,
    @Body() updateShelterDto: UpdateShelterDto,
    @User("sub") userId: string,
  ): Promise<Shelter> {
    return this.sheltersService.updateShelter(id, updateShelterDto, userId);
  }
}
