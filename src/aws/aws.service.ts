import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    S3ClientConfig,
    ObjectCannedACL,
    PutObjectCommandOutput,
    DeleteObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
    private s3Client: S3Client
    private config: S3ClientConfig
    private bucketName: string

    constructor(private configService: ConfigService) {
        this.bucketName = this.configService.get<string>("AWS_BUCKET_NAME"),
            this.config = {
                region: this.configService.get<string>("AWS_REGION"),
                credentials: {
                    accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY_ID"),
                    secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY"),
                },
            }
        this.s3Client = new S3Client(this.config);
    }

    switchBucket(bucketName: string): void {
        this.bucketName = bucketName
    }

    async deleteObject(key: string): Promise<DeleteObjectCommandOutput> {
        const result = await this.s3Client.send(
            new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            })
        );
        return result
    }

    async createObject(key: string, body: Buffer, ALC: ObjectCannedACL = ObjectCannedACL.public_read): Promise<PutObjectCommandOutput> {
        const result = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: body,
                ACL: ALC
            })
        );
        return result
    }

    async getObject(key: string): Promise<Uint8Array> {
        const { Body } = await this.s3Client.send(
            new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            })
        );
        const imageInByteArray = await Body.transformToByteArray()
        return imageInByteArray
    }
}