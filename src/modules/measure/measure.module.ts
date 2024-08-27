import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MeasureController } from './controllers/measure.controller';
import { PrismaMeasureRepository } from './repository/prisma/prisma-measure-repository';
import { MeasureService } from './services/measure.service';
import { SaveImageService } from './services/saveImage.service';

@Module({
  imports: [],
  controllers: [MeasureController],
  providers: [
    MeasureService,
    SaveImageService,
    PrismaService,
    {
      provide: 'MeasureRepository',
      useClass: PrismaMeasureRepository,
    },
  ],
})
export class MeasureModule {}
