export class ErrorDto {
  constructor(error_code: number, error_description: string) {
    this.error_code = error_code;
    this.error_description = error_description;
  }
  error_code: number;
  error_description: string;

  toString() {
    return JSON.stringify(this);
  }
}
