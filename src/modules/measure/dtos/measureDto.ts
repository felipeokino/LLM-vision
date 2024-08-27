export class MeasureDto {
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
  uuid: string;
  image_url: string;
  has_confirmed: boolean;
}
