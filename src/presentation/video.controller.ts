import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { GridFsService } from 'src/services/gridfs.service';

@Controller('video')
export class VideoController {
    constructor(private readonly gridFsService: GridFsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.gridFsService.upload(file);
    }

    @Get(':filename')
    async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
        const file = await this.gridFsService.download(filename);
        file.pipe(res);
    }
}