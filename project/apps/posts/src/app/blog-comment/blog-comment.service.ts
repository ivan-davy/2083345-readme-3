import {Injectable} from '@nestjs/common';
import dayjs from 'dayjs';
import {CreateCommentDto} from './dto/create-comment.dto';
import {BlogCommentEntity} from './blog-comment.entity';
import {BlogPostService} from '../blog-post/blog-post.service';
import {BlogCommentRepository} from './blog-comment.repository';


@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService,
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
    // Not yet implemented
    return this.blogPostService.getById(id);
  }

}

