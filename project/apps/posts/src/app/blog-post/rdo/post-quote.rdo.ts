import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';

export class PostQuoteRdo extends PostRdo {
  @ApiProperty({
    description: 'Post quote',
    example: 'Certified BRUH (c) moment.'
  })
  public quote: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Me.'
  })
  public quoteAuthor: string;
}
