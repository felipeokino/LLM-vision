import { MeasureType } from '@prisma/client';

export class MeasureDto {
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
  measure_value: string;
  uuid: string;
  image_url: string;
  has_confirmed: boolean;
}
