import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = false): RmqOptions {
    console.log(this.configService.get<string>('RMQ_URI'));
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URI')],
        queue: this.configService.get<string>(`RMQ_${queue}`),
        noAck,
        persistent: true,
      },
    };
  }
}
