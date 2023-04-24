import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {rabbitConfig} from '../index';
const ENV_POSTS_FILE_PATH = 'apps/posts/.posts.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig],
      envFilePath: ENV_POSTS_FILE_PATH,
    })
  ],
})
export class ConfigPostsModule {}
