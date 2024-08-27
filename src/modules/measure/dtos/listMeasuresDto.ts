import { MeasureType } from '@prisma/client';

class Measures {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: MeasureType;
  image_url: string;
  has_confirmed: boolean;
}
export class ListMeasuresDTO {
  customer_code: string;
  measures: Measures[];
}
