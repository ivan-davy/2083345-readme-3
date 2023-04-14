import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';
import {IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {POST_NOT_YOUTUBE_URL} from '../blog-post.const';

export class CreatePostVideoDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Post video link',
    example: 'youtube.com/aaaaaaa'
  })
  @Matches(/youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/, {message: POST_NOT_YOUTUBE_URL})
  public videoLink: string;
}
