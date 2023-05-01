import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

@Schema()
export class Video extends Document {
    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    contentType: String

    @Prop({ required: true })
    length: Number

    @Prop({ required: true })
    chunkSize: Number

    @Prop()
    metadata: Record<string, unknown>

    @Prop({ default: Date.now })
    createdAt?: Date;

    @Prop({ default: Date.now })
    updatedAt?: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);