import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
    ],
    controllers: [VideoController],
    providers: [GridFsMulterConfigService, VideoService],
})
export class VideoModule { }