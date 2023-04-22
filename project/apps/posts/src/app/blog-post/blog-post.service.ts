import {Injectable, NotFoundException} from '@nestjs/common';
import {TypeEntityAdapterObject} from './utils/type-entity-adapter.object';
import dayjs from 'dayjs';
import {DEFAULT_POST_LIKE_ACTION, POST_NOT_FOUND_ERROR} from './blog-post.const';
import {BlogPostRepository} from './blog-post.repository';
import {PostInterface, PostStatusEnum, TokenPayloadInterface} from '@project/shared/app-types';
import {GetPostsQuery} from './query/get-posts.query';
import {CreatePostDto} from './dto/create/create-post.dto';
import {UpdatePostDto} from './dto/update/update-post.dto';


@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async create(
    dto: CreatePostDto,
    user: TokenPayloadInterface
  ) {
    const blogPost = {
      status: PostStatusEnum.Posted,
      ...dto,
      _authorId: user.sub,
      _origAuthorId: user.sub,
      creationDate: dayjs().toISOString(),
      postDate: dayjs().toISOString(),
      likedByIds: [] as string[],
      commentsQty: 0,
      isReposted: false
    };

    const postEntity = await new TypeEntityAdapterObject[blogPost.type](blogPost);

    return this.blogPostRepository
      .create(postEntity);
  }

  public async update(
    postId: number,
    dto: UpdatePostDto,
  ) {

    const blogPost = await this.getById(postId);
    const updatedPost = {...blogPost, ...dto}

    const postEntity = await new TypeEntityAdapterObject[updatedPost.type](updatedPost);

    return this.blogPostRepository
      .update(postId, postEntity);
  }

  public async getById(id: number) {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }
    return post;
  }

  async get(query: GetPostsQuery): Promise<PostInterface[]> {
    return this.blogPostRepository.find(query);
  }

  public async remove(
    postId: number,
  ) {
    return this.blogPostRepository
      .destroy(postId);
  }

  public async like(
    postId: number,
    action: number = DEFAULT_POST_LIKE_ACTION
  ) {
    return this.blogPostRepository
      .like(postId, action);
  }

}

