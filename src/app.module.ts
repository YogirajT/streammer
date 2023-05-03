import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './presentation/app.controller';
import { AppService } from './services/app.service';
import { VideoModule } from './video/video.module';
import { VideoController } from './video/video.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionName: 'dbConnectionName',
      }),
      inject: [ConfigService],
    }), VideoModule],
  controllers: [AppController, VideoController],
  providers: [AppService],
})

export class AppModule { }
