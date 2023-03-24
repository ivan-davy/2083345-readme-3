import {Body, Controller, Get, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreatePostTextDto} from './dto/create-post-text.dto';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {BlogPostService} from './blog-post.service';
import {PostRdo} from './rdo/post.rdo';
import {fillRdoForPost} from './utils/fill-rdo-for-post';

@ApiTags('posts')
@Controller('post')
export class BlogPostController {
  constructor(
    private readonly postService: BlogPostService
  ) {
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully created.',
  })
  @Post('new')
  public async create(@Body() dto: CreatePostTextDto) {
    const newPost = await this.postService.create(dto);
    console.log(newPost);
    return fillRdoForPost(newPost);
  }

  @ApiResponse({
    type: PostRdo,
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
    console.log(post);
    return fillRdoForPost(post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully updated.',
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: CreatePostTextDto) {
    const updatedPost = await this.postService.update(id, dto);
    console.log(updatedPost);
    return fillRdoForPost(updatedPost);
  }
}
