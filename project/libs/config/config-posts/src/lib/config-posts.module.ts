import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {jwtConfig} from '@project/config/config-users';

const ENV_USERS_FILE_PATH = 'apps/posts/.posts.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    })
  ],
})
export class ConfigPostsModule {}
