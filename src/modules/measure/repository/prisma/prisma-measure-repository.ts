import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import { Measure } from '@prisma/client';
import { ListMeasureOptionsDTO } from '../../dtos/listMeasureOptionsDto';
import { MeasureDto } from '../../dtos/measureDto';
import { MeasureRepository } from '../measure-repository';

@Injectable()
export class PrismaMeasureRepository implements MeasureRepository {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(measure_data: Omit<MeasureDto, 'uuid'>): Promise<string> {
    const response = await this.prisma.measure.create({
      data: {
        customer_code: measure_data.customer_code,
        measure_datetime: measure_data.measure_datetime,
        measure_type: measure_data.measure_type,
        measure_value: measure_data.measure_value,
        image_url: measure_data.image_url,
      },
    });
    return response.uuid;
  }
  async update(measure_data: MeasureDto): Promise<MeasureDto> {
    return this.prisma.measure.update({
      where: {
        uuid: measure_data.uuid,
      },
      data: measure_data,
    });
  }
  async findAllByCustomerCode(
    customer_code: string,
    { measure_type = null }: ListMeasureOptionsDTO,
  ): Promise<Array<MeasureDto>> {
    const measureFilter = {
      customer_code,
      measure_type: measure_type,
    };

    if (!Boolean(measure_type)) {
      delete measureFilter.measure_type;
    }

    return await this.prisma.measure.findMany({
      where: measureFilter,
    });
  }
  async findByDate(
    filters: Record<keyof Pick<Measure, 'customer_code' | 'measure_type'>, any>,
    dateInit: Date,
    dateEnd: Date,
  ): Promise<Array<MeasureDto>> {
    return await this.prisma.measure.findMany({
      where: {
        ...filters,
        measure_datetime: {
          gte: dateInit,
          lte: dateEnd,
        },
      },
    });
  }

  async findByUUID(measure_uuid: string): Promise<MeasureDto | null> {
    return await this.prisma.measure.findUnique({
      where: {
        uuid: measure_uuid,
      },
    });
  }
}
