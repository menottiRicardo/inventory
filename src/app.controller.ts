import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCarDto } from './dto/createCar.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-car')
  async createCar(@Body() data: CreateCarDto) {
    return this.appService.createCar(data);
  }

  @Get('all-car')
  async getAll() {
    return this.appService.getAllCars();
  }
}
