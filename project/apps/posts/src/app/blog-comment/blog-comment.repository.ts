import { BlogCommentEntity } from './blog-comment.entity';
import { CommentInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CrudRepositoryInterface } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogCommentRepository implements CrudRepositoryInterface<BlogCommentEntity, number, CommentInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogCommentEntity): Promise<CommentInterface> {
    const comment = await this.prisma.comment.create({
      data: { ...item.toObject() }
    });
    const postedDate = comment.postedDate.toISOString();
    return {...comment, postedDate}
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public async findById(commentId: number): Promise<CommentInterface | null> {
    const comment = await this.prisma.comment.findFirst({
      where: {
        commentId
      }
    });
    const postedDate = comment.postedDate.toISOString();
    return {...comment, postedDate}
  }

  public async find(commentId: number[] = []): Promise<CommentInterface[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        commentId: {
          in: commentId.length > 0 ? commentId : undefined
        }
      }
    });
    return comments.map((item) => {
      const postedDate = item.postedDate.toISOString();
      return {...item, postedDate}
    })
  }

  public async update(commentId: number, item: BlogCommentEntity): Promise<CommentInterface> {
    const comment = await this.prisma.comment.update({
      where: {
        commentId
      },
      data: { ...item.toObject(), commentId}
    });
    const postedDate = comment.postedDate.toISOString();
    return {...comment, postedDate}
  }
}
