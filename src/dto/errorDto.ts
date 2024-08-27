import { HttpException, HttpStatus } from '@nestjs/common';
export class ErrorDto extends HttpException {
  constructor(
    error_code: string,
    error_description: string,
    statusCode: HttpStatus | number = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        error_description: error_description,
        error_code: error_code,
      },
      statusCode,
    );
  }
}
