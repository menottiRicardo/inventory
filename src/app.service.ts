import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CreateCarDto } from './dto/createCar.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  createCar(data: CreateCarDto) {
    const newCar = this.prisma.car.create({
      data: data,
    });
    return newCar;
  }

  getAllCars() {
    return this.prisma.car.findMany();
  }
}
