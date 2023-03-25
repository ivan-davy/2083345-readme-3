import { Module } from '@nestjs/common';
import {BlogCommentController} from './blog-comment.controller';
import {BlogCommentService} from './blog-comment.service';
import {BlogCommentMemoryRepository} from './blog-comment-memory.repository';

@Module({
  providers: [BlogCommentMemoryRepository, BlogCommentService],
  controllers: [BlogCommentController],
  exports: [BlogCommentMemoryRepository, BlogCommentService]
})
@Module({})
export class BlogCommentModule {}
