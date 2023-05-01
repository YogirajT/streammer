import { Injectable, Inject } from '@nestjs/common';
import { GridFSBucket, GridFSBucketReadStream, GridFSBucketWriteStream, ObjectId } from 'mongodb';

@Injectable()
export class GridFsService {
    private gridFsBucket: GridFSBucket;

    constructor(
        @Inject(GridFsOptionsToken) private readonly options: any,
    ) {
        this.gridFsBucket = new GridFSBucket(options.connection.db, {
            bucketName: options.bucketName,
        });
    }

    async upload(file: Express.Multer.File): Promise<ObjectId> {
        const writeStream: GridFSBucketWriteStream = this.gridFsBucket.openUploadStream(file.originalname, {
            contentType: file.mimetype,
        });
        const readStream: NodeJS.ReadableStream = file.stream;

        readStream.pipe(writeStream);

        return new Promise((resolve, reject) => {
            writeStream.on('error', reject);
            writeStream.on('finish', () => resolve(writeStream.id));
        });
    }

    async download(filename: string): Promise<GridFSBucketReadStream> {
        const file = await this.gridFsBucket.find({ filename }).toArray();

        if (file.length === 0) {
            throw new Error('File not found');
        }

        return this.gridFsBucket.openDownloadStreamByName(filename);
    }
}