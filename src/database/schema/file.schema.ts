import { Schema } from 'mongoose';

export const GridFsFilesSchema = new Schema({
    filename: String,
    contentType: String,
    length: Number,
    chunkSize: Number,
    uploadDate: Date,
    metadata: {},
});
