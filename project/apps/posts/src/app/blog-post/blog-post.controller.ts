import { Body, Controller, Get, HttpStatus, Param, Post, Patch } from '@nestjs/common';
import { CreatePostTextDto } from './dto/create-post-text.dto';
import { UserRdo } from './rdo/user.rdo';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostService } from './blog-post.service';
import {PostQuoteRdo} from './rdo/post-quote.rdo';
import {PostImageRdo} from './rdo/post-image.rdo';
import {PostLinkRdo} from './rdo/post-link.rdo';
import {PostVideoRdo} from './rdo/post-video.rdo';
import {PostTextRdo} from './rdo/post-text.rdo';
import {TypeRdoAdapterObject} from './utils/type-rdo-adapter.object';

@ApiTags('posts')
@Controller('post')
export class BlogPostController {
  constructor(
    private readonly postService: BlogPostService
  ) {
  }

  @ApiResponse({
    type: PostTextRdo || PostImageRdo || PostVideoRdo || PostLinkRdo || PostQuoteRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully created.',
  })
  @Post('new')
  public async create(@Body() dto: CreatePostTextDto) {
    const newUser = await this.postService.create(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: PostTextRdo || PostImageRdo || PostVideoRdo || PostLinkRdo || PostQuoteRdo,
    status: HttpStatus.OK,
    description: 'Post data provided.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getById(id);
    const rdo = TypeRdoAdapterObject[post.type];
    return fillObject(rdo, post);
  }

  @ApiResponse({
    type: PostTextRdo || PostImageRdo || PostVideoRdo || PostLinkRdo || PostQuoteRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully updated.',
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreatePostTextDto) {
    const updatedPost = await this.postService.update(id, dto);
    const rdo = TypeRdoAdapterObject[updatedPost.type];
    return fillObject(rdo, updatedPost);
  }
}
