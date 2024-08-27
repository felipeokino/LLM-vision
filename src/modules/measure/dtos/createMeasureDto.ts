import { MeasureType } from '@prisma/client';

export class CreateMeasureDTO {
  image: any;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}
