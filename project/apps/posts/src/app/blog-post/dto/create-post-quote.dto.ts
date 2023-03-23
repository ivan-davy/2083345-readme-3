import {ApiProperty} from '@nestjs/swagger';

export class CreatePostQuoteDto {
  @ApiProperty({
    description: 'Optional post tags',
    example: ['tag1', 'tag2', 'tag3']
  })
  public tags: string[];

  @ApiProperty({
    description: 'Post quote',
    example: 'Certified BRUH (c) moment.'
  })
  public quote: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Me.'
  })
  public author: string;
}
