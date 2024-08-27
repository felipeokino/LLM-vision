import { MeasureType } from '@prisma/client';

export class MeasuresResponseDto {
  uuid: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: MeasureType;
  has_confirmed: boolean;
  image_url: string;
}
