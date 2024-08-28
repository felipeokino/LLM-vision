import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasureModule } from './modules/measure/measure.module';

@Module({
  imports: [ConfigModule.forRoot(), MeasureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
