import { Measure } from '@prisma/client';
import { ListMeasureOptionsDTO } from '../dtos/listMeasureOptionsDto';
import { MeasureDto } from '../dtos/measureDto';

export abstract class MeasureRepository {
  abstract create(
    measure_data: Omit<MeasureDto, 'uuid' | 'image'>,
  ): Promise<string>;
  abstract update(measure_data: Partial<MeasureDto>): void;
  abstract findAllByCustomerCode(
    customer_code: string,
    opts: ListMeasureOptionsDTO,
  ): Promise<Array<MeasureDto>>;
  abstract findByDate(
    filters: Record<keyof Pick<Measure, 'customer_code' | 'measure_type'>, any>,
    startDate: Date,
    endDate: Date,
  ): Promise<Array<MeasureDto>>;
  abstract findByUUID(measure_uuid: string): Promise<MeasureDto | null>;
}
