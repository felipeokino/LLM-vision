import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ConfirmMeasureDTO } from '../dtos/confirmMeasureDto';
import { CreateMeasureDTO } from '../dtos/createMeasureDto';
import { MeasureService } from '../services/measure.service';

@Controller('api/measure')
export class MeasureController {
  @Inject(MeasureService)
  private measureService: MeasureService;

  @Post('upload')
  upload(@Body() body: CreateMeasureDTO) {
    return this.measureService.upload(body);
  }

  @Patch('confirm')
  confirm(@Body() body: ConfirmMeasureDTO) {
    return this.measureService.confirm(body);
  }

  @Get('/:customer_id/list')
  findAllByCustomerId(@Param('customer_id') query: string) {
    return this.measureService.findAllByCustomerId(query);
  }
}
