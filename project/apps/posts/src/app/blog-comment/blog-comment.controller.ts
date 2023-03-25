import {Body, Controller, Get, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {CommentRdo} from './rdo/comment.rdo';
import {CreateCommentDto} from './dto/create-comment.dto';
import {fillObject} from '@project/util/util-core';
import {BlogCommentService} from './blog-comment.service';


@ApiTags('comments')
@Controller('comment')
export class BlogCommentController {
  constructor(
    private readonly commentService: BlogCommentService
  ) {
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment successfully created.',
  })
  @Post('new')
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(dto);
    return fillObject(CreateCommentDto, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment data provided.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.'
  })
  @Get('post/:postId')
  public async showByPostId(@Param('postId') postId: string) {
    const comments = await this.commentService.getByPostId(postId);
    return fillObject(CreateCommentDto, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment successfully deleted.',
  })
  @Patch(':commentId')
  public async remove(@Param('commentId') commentId: string) {
    return await this.commentService.remove(commentId);
  }
}
