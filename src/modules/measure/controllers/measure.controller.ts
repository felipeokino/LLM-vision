import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ConfirmMeasureDTO } from '../dtos/confirmMeasureDto';
import { CreateMeasureDTO } from '../dtos/createMeasureDto';
import { ListMeasureOptionsDTO } from '../dtos/listMeasureOptionsDto';
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

  @Get('/:customer_code/list')
  findAllByCustomerId(
    @Param('customer_code') customer_code: string,
    @Query() opts: ListMeasureOptionsDTO,
  ) {
    return this.measureService.findAllByCustomerId(customer_code, opts);
  }
}
