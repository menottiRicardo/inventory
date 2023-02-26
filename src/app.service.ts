import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from './database/prisma.service';
import { CreateCarDto } from './dto/createCar.dto';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject('AUTH') private authService: ClientProxy,
  ) {}

  createCar(data: CreateCarDto, id: string) {
    const newCar = this.prisma.car.create({
      data: {
        ...data,
        ownerId: id.toString(),
      },
    });
    return newCar;
  }

  getAllCars() {
    return this.prisma.car.findMany();
  }

  async getAllCarsById(id) {
    if (!id) {
      throw Error('id is empty or undefined');
    }
    const cars = this.prisma.car.findMany({
      where: {
        ownerId: id,
      },
    });
    return cars;
  }
}
