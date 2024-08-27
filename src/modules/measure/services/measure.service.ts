import { Injectable } from '@nestjs/common';

import { ErrorDto } from 'src/dto/errorDto';
import { ConfirmMeasureDTO } from '../dtos/confirmMeasureDto';
import { ConfirmMeasureResponseDTO } from '../dtos/confirmMeasureResponseDto';
import { CreateMeasureDTO } from '../dtos/createMeasureDto';
import { CreateMeasureResponseDTO } from '../dtos/createMeasureResponseDto';
import { SaveImageService } from './saveImage.service';

const memory_db = [];
const image_db = [];
@Injectable()
export class MeasureService {
  constructor(private readonly imageService: SaveImageService) {}
  upload(measureData: CreateMeasureDTO): CreateMeasureResponseDTO | ErrorDto {
    const rawMeasureData = memory_db.find(
      (item) => item.measure_datetime === measureData.measure_datetime,
    );
    if (rawMeasureData) {
      return new ErrorDto(409, 'Leitura do mês ja realizada.');
    }
    const imageUUID = this.imageService.createImage(measureData.image);
    const imageRef = {
      image: measureData.image,
      ref: imageUUID,
    };
    image_db.push(imageRef);
    const responseData = {
      measure_uuid: crypto.randomUUID(),
      measure_value: 0,
      image_url: 'http://localhost:3000/uploads/' + imageRef.ref + '.png',
    };
    memory_db.push({
      ...measureData,
      ...responseData,
    });

    return responseData;
  }

  confirm(
    measureData: ConfirmMeasureDTO,
  ): ConfirmMeasureResponseDTO | ErrorDto {
    console.log(measureData);
    return {
      sucess: true,
    };
  }

  findAllByCustomerId(customerId: string): string {
    return customerId;
  }
}
