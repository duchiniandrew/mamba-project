import { Module } from '@nestjs/common';
import { S3Service } from './aws.service';

@Module({
  exports: [S3Service],
  controllers: [],
  providers: [S3Service]
})
export class AwsModule { }
