import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpotStatus } from '@prisma/client';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    console.log('CREATESPOTDTO HERE', createSpotDto);
    const event = await this.prismaService.event.findFirst({
      where: {
        id: createSpotDto.eventId,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }
    return this.prismaService.spots.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.available,
      },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spots.findMany({
      where: {
        eventId,
      },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spots.findFirst({
      where: {
        id: spotId,
        eventId,
      },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spots.update({
      where: {
        id: spotId,
        eventId,
      },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spots.delete({
      where: {
        id: spotId,
        eventId,
      },
    });
  }
}
