import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './decorators';
import { CreateCarDto } from './dto/createCar.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-car')
  async createCar(@Body() data: CreateCarDto, @CurrentUser() userId: string) {
    return this.appService.createCar(data, userId);
  }

  @Get('all-cars')
  async getAll() {
    return this.appService.getAllCars();
  }

  @Get('all-cars-id')
  async getAllById(@Query('id') id: string) {
    return this.appService.getAllCarsById(id);
  }
}
