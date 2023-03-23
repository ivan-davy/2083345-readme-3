import {ApiProperty} from '@nestjs/swagger';

export class CreatePostVideoDto {
  @ApiProperty({
    description: 'Optional post tags',
    example: ['tag1', 'tag2', 'tag3']
  })
  public tags: string[];

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
