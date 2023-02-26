import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common/interfaces/modules';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { RmqService } from './rmq.service';

interface RmqModuleOptions {
  name: string;
}
@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RMQ_URI')],
                queue: configService.get<string>(`RMQ_QUEUE_${name}`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
