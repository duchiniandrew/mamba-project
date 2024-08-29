import { Module } from '@nestjs/common';
import { S3Service } from './aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  exports: [S3Service],
  controllers: [],
  providers: [S3Service]
})
export class AwsModule { }
