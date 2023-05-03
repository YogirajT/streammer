import { ApiProperty } from '@nestjs/swagger';
import { VideoInfo } from './video.model';

export class VideoResponse {
    @ApiProperty() message: string;

    @ApiProperty({ type: VideoInfo })
    file: VideoInfo;
}