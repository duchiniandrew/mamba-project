import { ApiProperty } from '@nestjs/swagger';

export class BadRequestCommonError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}

export class RequestError extends Error {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.error = message;
  }
}
