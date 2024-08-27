import { Module } from '@nestjs/common';
import { MeasureController } from './controllers/measure.controller';
import { MeasureService } from './services/measure.service';
import { SaveImageService } from './services/saveImage.service';

@Module({
  imports: [],
  controllers: [MeasureController],
  providers: [MeasureService, SaveImageService],
})
export class MeasureModule {}
