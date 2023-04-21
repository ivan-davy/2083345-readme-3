import { Module } from '@nestjs/common';
import {BlogPostController} from './blog-post.controller';
import {BlogPostService} from './blog-post.service';
import {BlogPostRepository} from './blog-post.repository';
import {JwtAccessStrategy} from '@project/util/util-auth';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {getJwtOptions} from '@project/config/config-users';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
  ],
  providers: [BlogPostService, BlogPostRepository, JwtAccessStrategy],
  controllers: [BlogPostController],
  exports: [BlogPostService]
})
export class BlogPostModule {}
