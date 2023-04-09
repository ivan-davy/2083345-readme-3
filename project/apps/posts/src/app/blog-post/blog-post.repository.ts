import { BlogPostEntity } from './blog-post.entity';
import {PostInterface, PostStatusEnum, PostTypeEnum} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CrudRepositoryInterface } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogPostRepository implements CrudRepositoryInterface<BlogPostEntity, number, PostInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<PostInterface> {
    const post = await this.prisma.post.create({
      data: { ...item.toObject() }
    });
    const postedDate = post.postedDate.toISOString()
    const creationDate = post.creationDate.toISOString()
    const type = post.type as PostTypeEnum
    const status = post.type as PostStatusEnum
    return {...post, postedDate, creationDate, type, status};
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
    const postedDate = post.postedDate.toISOString()
    const creationDate = post.creationDate.toISOString()
    const type = post.type as PostTypeEnum
    const status = post.type as PostStatusEnum
    return {...post, postedDate, creationDate, type, status};
  }

  public async find(ids: number[] = []): Promise<PostInterface[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        postId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
    return posts.map((item) => {
      const postedDate = item.postedDate.toISOString()
      const creationDate = item.creationDate.toISOString()
      const type = item.type as PostTypeEnum
      const status = item.type as PostStatusEnum
      return {...item, postedDate, creationDate, type, status}
    })
  }

  public async update(postId: number, item: BlogPostEntity): Promise<PostInterface> {
    const post = await this.prisma.post.update({
      where: {
        postId
      },
      data: { ...item.toObject(), postId}
    });
    const postedDate = post.postedDate.toISOString()
    const creationDate = post.creationDate.toISOString()
    const type = post.type as PostTypeEnum
    const status = post.type as PostStatusEnum
    return {...post, postedDate, creationDate, type, status};
  }
}
