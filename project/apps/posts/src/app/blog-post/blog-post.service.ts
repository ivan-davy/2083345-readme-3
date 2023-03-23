import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {BlogPostMemoryRepository} from './blog-post-memory.repository';
import {CreatePostTextDto} from './dto/create-post-text.dto';
import {BlogPostEntity} from './blog-post.entity';
import {CreatePostImageDto} from './dto/create-post-image.dto';
import {CreatePostVideoDto} from './dto/create-post-video.dto';
import {CreatePostLinkDto} from './dto/create-post-link.dto';
import {CreatePostQuoteDto} from './dto/create-post-quote.dto';
import {BlogPostTextEntity} from './blog-post-text.entity';
import dayjs from 'dayjs';


@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostMemoryRepository
  ) {}

  public async create(
    dto: CreatePostTextDto | CreatePostImageDto | CreatePostVideoDto | CreatePostLinkDto | CreatePostQuoteDto
  ) {
    const blogPost = {
      ...dto,
      creationDate: dayjs().toISOString(),
      postDate: dayjs().toISOString(),
      likesQty: 0,
      commentsQty: 0,
      status: 'draft',
      isReposted: false
    };
    const postEntity = await new BlogPostTextEntity(blogPost)

    return this.blogPostRepository
      .create(postEntity);
  }

  public async getById(id: string) {
    return this.blogPostRepository.findById(id);
  }

}
