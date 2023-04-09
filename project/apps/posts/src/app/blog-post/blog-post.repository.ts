import { BlogPostEntity } from './blog-post.entity';
import { PostInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CrudRepositoryInterface } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogPostRepository implements CrudRepositoryInterface<BlogPostEntity, number, PostInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<PostInterface> {
    return this.prisma.post.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public findById(postId: number): Promise<PostInterface | null> {
    return this.prisma.post.findFirst({
      where: {
        postId
      }
    });
  }

  public find(ids: number[] = []): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      where: {
        postId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(postId: number, item: BlogPostEntity): Promise<PostInterface> {
    return this.prisma.post.update({
      where: {
        postId
      },
      data: { ...item.toObject(), postId}
    });
  }
}
