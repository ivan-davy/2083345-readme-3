import { BlogCommentEntity } from './blog-comment.entity';
import { CommentInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CrudRepositoryInterface } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogCommentRepository implements CrudRepositoryInterface<BlogCommentEntity, number, CommentInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogCommentEntity): Promise<CommentInterface> {
    return this.prisma.comment.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        postId,
      }
    });
  }

  public findById(postId: number): Promise<CommentInterface | null> {
    return this.prisma.comment.findFirst({
      where: {
        postId
      }
    });
  }

  public find(ids: number[] = []): Promise<CommentInterface[]> {
    return this.prisma.comment.findMany({
      where: {
        postId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(postId: number, item: BlogCommentEntity): Promise<CommentInterface> {
    return this.prisma.comment.update({
      where: {
        postId
      },
      data: { ...item.toObject(), postId}
    });
  }
}
