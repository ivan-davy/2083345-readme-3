import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentService } from './blog-comment/blog-comment.service';
import { BlogPostService } from './blog-post/blog-post.service';
import { BlogCommentModule } from './blog-comment/blog-comment.module';

@Module({
  imports: [BlogPostModule, BlogCommentModule],
  controllers: [],
  providers: [BlogPostService, BlogCommentService],
})
export class AppModule {}
