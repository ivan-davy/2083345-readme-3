import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigPostsModule} from '@project/config/config-posts';
import {NotifyModule} from './notify/notify.module';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    PrismaModule,
    ConfigPostsModule,
    NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
