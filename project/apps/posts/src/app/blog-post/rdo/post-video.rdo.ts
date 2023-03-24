import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';

export class PostVideoRdo extends PostRdo {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  public title: string;

  @ApiProperty({
    description: 'Post video link',
    example: 'https://youtube.com/aaaaaaa'
  })
  public videoLink: string;
}
