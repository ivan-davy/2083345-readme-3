import { Module } from '@nestjs/common';
import { BlogPostService } from './blog-post/blog-post.service';

@Module({
  imports: [],
  controllers: [],
  providers: [BlogPostService],
})
export class AppModule {}
