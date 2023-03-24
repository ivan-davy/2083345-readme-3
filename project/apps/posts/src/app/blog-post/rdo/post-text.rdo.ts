import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';

export class PostTextRdo extends PostRdo {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  public title: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Wow!!!'
  })
  public announcement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Epic information'
  })
  public text: string;
}
