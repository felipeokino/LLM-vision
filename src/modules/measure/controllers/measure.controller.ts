import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ConfirmMeasureDTO } from '../dtos/confirmMeasureDto';
import { CreateMeasureDTO } from '../dtos/createMeasureDto';
import { ListMeasureOptionsDTO } from '../dtos/listMeasureOptionsDto';
import { MeasureService } from '../services/measure.service';

@Controller('api/measure')
export class MeasureController {
  @Inject(MeasureService)
  private measureService: MeasureService;

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('image'))
  fileUpload(
    @Body() body: Omit<CreateMeasureDTO, 'image'>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.measureService.upload({
      ...body,
      image: file.buffer.toString('base64'),
    });
  }
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
