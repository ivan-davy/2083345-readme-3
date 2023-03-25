import {Injectable} from '@nestjs/common';
import dayjs from 'dayjs';
import {CreateCommentDto} from './dto/create-comment.dto';
import {BlogCommentEntity} from './blog-comment.entity';
import {BlogPostMemoryRepository} from '../blog-post/blog-post-memory.repository';
import {BlogCommentMemoryRepository} from './blog-comment-memory.repository';


@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentMemoryRepository,
    private readonly blogPostRepository: BlogPostMemoryRepository,
  ) {}

  public async create(
    dto: CreateCommentDto
  ) {
    const blogComment = {
      ...dto,
      _authorId: '',
      postedDate: dayjs().toISOString(),
    };

    const commentEntity = await new BlogCommentEntity(blogComment);

    return this.blogCommentRepository
      .create(commentEntity);
  }

  public async remove(
    commentId: string,
  ) {
    return this.blogCommentRepository
      .destroy(commentId);
  }

  public async getByPostId(id: string) {
    const post = this.blogPostRepository.findById(id);
    return post;
  }

}

