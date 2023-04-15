import { BlogPostEntity } from './blog-post.entity';
import {PostInterface, PostStatusEnum, PostTypeEnum} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CrudRepositoryInterface } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { prismaPostToPost } from './utils/prisma-post-to-post';
import {PostQuery} from './query/post.query';

@Injectable()
export class BlogPostRepository implements CrudRepositoryInterface<BlogPostEntity, number, PostInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<PostInterface> {
    const data = {
      ...item.toObject(),
      authorId: item._authorId,
      origAuthorId: item._origAuthorId
    }
    delete data._authorId;
    delete data._origAuthorId;

    const post = await this.prisma.post.create({data});
    return prismaPostToPost(post);
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public async findById(postId: number): Promise<PostInterface | null> {
    const post = await this.prisma.post.findFirst({
      where: {
        postId
      }
    });
    return prismaPostToPost(post);
  }

  public async find({limit, tag, type, sortDirection, page}: PostQuery): Promise<PostInterface[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        AND: {
          status: PostStatusEnum.Posted,
          tags: { has: tag },
          type: type as PostTypeEnum
        }
      },
      take: limit,
      include: {
        comments: true,
      },
      orderBy: [
        { creationDate: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    return posts.map((post) => prismaPostToPost(post))
  }

  public async update(postId: number, item: BlogPostEntity): Promise<PostInterface> {
    const data = {
      ...item.toObject(),
      authorId: item._authorId,
      origAuthorId: item._origAuthorId
    }
    delete data._id;
    delete data._authorId;
    delete data._origAuthorId;

    const post = await this.prisma.post.update({
      where: {
        postId
      },
      data: { ...data}
    });
    return prismaPostToPost(post);
  }
}
