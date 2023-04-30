import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Req} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ApplicationServiceURL} from './app.config';
import {PostRdo} from './rdo/post.rdo';
import {fillAuthorData} from './utils/fill-author-data.util';
import {GetPostsQuery} from './query/get-posts.query';
import {LikePostQuery} from './query/like-post.query';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get(':postId')
  public async getPost(@Param('postId') postId) {
    const post: PostRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogPost}/${postId}`)).data;
    return await fillAuthorData(post, this.httpService);
  }

  @Get()
  public async getPosts(
    @Query() query: GetPostsQuery
  ) {
    const posts: PostRdo[] = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogPost}`, {
      params: query
    })).data;
    return await Promise.all(posts.map( (post) => fillAuthorData(post, this.httpService)));
  }

  @Delete(':postId')
  public async deletePost(
    @Req() req: Request,
    @Param('postId') postId
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.BlogPost}/${postId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Post('new')
  public async createPost(
    @Req() req: Request,
    @Body() createPostDto
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/new`, createPostDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Patch(':postId')
  public async updatePost(
    @Req() req: Request,
    @Param('postId') postId,
    @Body() updatePostDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.BlogPost}/${postId}`, updatePostDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Post(':postId/repost')
  public async repost(
    @Req() req: Request,
    @Param('postId') postId,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/${postId}/repost`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Post(':postId/like')
  public async likePost(
    @Req() req: Request,
    @Param('postId') postId,
    @Query() query: LikePostQuery,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/${postId}/like`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      },
      params: query
    });
    return data;
  }

  @Post('news')
  public async sendNewsletters(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/news`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

}
