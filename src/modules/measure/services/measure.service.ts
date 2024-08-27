import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ErrorDto } from 'src/dto/errorDto';

import { MeasureType } from '@prisma/client';
import { endOfMonth, startOfMonth } from 'date-fns';
import { ConfirmMeasureDTO } from '../dtos/confirmMeasureDto';
import { ConfirmMeasureResponseDTO } from '../dtos/confirmMeasureResponseDto';
import { CreateMeasureDTO } from '../dtos/createMeasureDto';
import { CreateMeasureResponseDTO } from '../dtos/createMeasureResponseDto';
import { ListMeasureOptionsDTO } from '../dtos/listMeasureOptionsDto';
import { ListMeasuresDTO } from '../dtos/listMeasuresDto';
import { MeasureRepository } from '../repository/measure-repository';
import { SaveImageService } from './saveImage.service';

@Injectable()
export class MeasureService {
  @Inject('MeasureRepository')
  private readonly prismaRepository: MeasureRepository;

  @Inject(SaveImageService)
  private readonly imageService: SaveImageService;

  validateIfRegisterAlreadyExists = async (
    measureData: CreateMeasureDTO,
  ): Promise<boolean> => {
    const now = new Date(measureData.measure_datetime);

    const initDate = startOfMonth(now);
    const endDate = endOfMonth(now);

    const measureList = await this.prismaRepository.findByDate(
      {
        customer_code: measureData.customer_code,
        measure_type: measureData.measure_type,
      },
      initDate,
      endDate,
    );

    return measureList.length > 0;
  };

  async upload(
    measureData: CreateMeasureDTO,
  ): Promise<CreateMeasureResponseDTO> {
    const isRegistered =
      await this.validateIfRegisterAlreadyExists(measureData);

    if (isRegistered) {
      throw new ErrorDto(
        'DOUBLE_REPORT',
        'Leitura do mês já realizada',
        HttpStatus.CONFLICT,
      );
    }

    const imageUUID = this.imageService.createImage(measureData.image);

    const data = {
      customer_code: measureData.customer_code,
      measure_datetime: measureData.measure_datetime,
      measure_type: measureData.measure_type,
      image_url: 'http://localhost:3000/uploads/' + imageUUID + '.png',
      has_confirmed: false,
    };

    const measureUUID = await this.prismaRepository.create(data);

    return {
      measure_uuid: measureUUID,
      measure_value: 0,
      image_url: data.image_url,
    };
  }

  async confirm(
    measureData: ConfirmMeasureDTO,
  ): Promise<ConfirmMeasureResponseDTO> {
    const _measure = await this.prismaRepository.findByUUID(
      measureData.measure_uuid,
    );

    if (!_measure) {
      throw new ErrorDto(
        'MEASURE_NOT_FOUND',
        'Leitura não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    if (_measure.has_confirmed) {
      throw new ErrorDto(
        'MEASURE_ALREADY_CONFIRMED',
        'Leitura já confirmada',
        HttpStatus.CONFLICT,
      );
    }

    this.prismaRepository.update({
      uuid: measureData.measure_uuid,
      has_confirmed: true,
    });
    return {
      sucess: true,
    };
  }

  async findAllByCustomerId(
    customerId: string,
    opts: ListMeasureOptionsDTO,
  ): Promise<ListMeasuresDTO> {
    if (
      opts.measure_type &&
      !Object.values(MeasureType).includes(opts.measure_type)
    ) {
      throw new ErrorDto(
        'INVALID_TYPE',
        'Invalid measure type. Valid types are: GAS, WATER',
        HttpStatus.BAD_REQUEST,
      );
    }

    const measures = await this.prismaRepository.findAllByCustomerCode(
      customerId,
      opts,
    );

    if (measures.length === 0) {
      throw new ErrorDto(
        'MEASURES_NOT_FOUND',
        'Nenhuma leitura encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      customer_code: customerId,
      measures: measures.map((item) => ({
        measure_uuid: item.uuid,
        image_url: item.image_url,
        measure_datetime: item.measure_datetime,
        measure_type: item.measure_type,
        has_confirmed: item.has_confirmed,
      })),
    };
  }
}
