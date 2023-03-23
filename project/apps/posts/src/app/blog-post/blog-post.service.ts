import {Injectable, NotFoundException} from '@nestjs/common';
import {BlogPostMemoryRepository} from './blog-post-memory.repository';
import {CreatePostTextDto} from './dto/create-post-text.dto';
import {CreatePostImageDto} from './dto/create-post-image.dto';
import {CreatePostVideoDto} from './dto/create-post-video.dto';
import {CreatePostLinkDto} from './dto/create-post-link.dto';
import {CreatePostQuoteDto} from './dto/create-post-quote.dto';
import {TypeEntityAdapterObject} from './utils/type-entity-adapter.object';
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
      isReposted: false
    };

    const postEntity = await new TypeEntityAdapterObject[blogPost.type](blogPost);

    return this.blogPostRepository
      .create(postEntity);
  }

  public async update(
    postId: string,
    dto: CreatePostTextDto | CreatePostImageDto | CreatePostVideoDto | CreatePostLinkDto | CreatePostQuoteDto,
  ) {

    const blogPost = await this.getById(postId);
    const updatedPost = {...blogPost, ...dto}

    const postEntity = await new TypeEntityAdapterObject[updatedPost.type](updatedPost);

    return this.blogPostRepository
      .update(postId, postEntity);
  }

  public async getById(id: string) {
    return this.blogPostRepository.findById(id);
  }

}

