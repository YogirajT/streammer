import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';

@Injectable()
export class DatabaseService {
    constructor(@InjectModel(Video.name) private videoModel: Model<Video>) { }

    async getVideoById(id: string): Promise<Video> {
        return this.videoModel.findById(id).exec();
    }

    async createVideo(video: Video): Promise<Video> {
        const createdVideo = new this.videoModel(video);
        return createdVideo.save();
    }

    async updateVideo(id: string, video: Video): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(id, video, { new: true }).exec();
    }

    async deleteVideo(id: string): Promise<Video> {
        return this.videoModel.findByIdAndDelete(id).exec();
    }
}