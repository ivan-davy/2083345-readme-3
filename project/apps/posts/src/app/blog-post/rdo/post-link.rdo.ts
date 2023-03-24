import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';

export class PostLinkRdo extends PostRdo {
  @ApiProperty({
    description: 'Post link',
    example: 'https://google.com/post.html'
  })
  public link: string;

  @ApiProperty({
    description: 'Optional link description',
    example: 'Linky-link'
  })
  public description: string;
}
