import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { createConnection } from 'mongoose';
import { GridFsService } from 'src/services/gridfs.service';
import { VideoSchema } from './schema/video.schema';
import { VideoController } from 'src/presentation/video.controller';
import { VideoConfigService } from 'src/services/video.config.service';

const connection = createConnection('mongodb://localhost/mydb');

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'VideoFiles', schema: VideoSchema }], 'mydb'),
    ],
    controllers: [VideoController],
    providers: [
        GridFsService,
        VideoConfigService
    ],
})
export class VideoModule { }