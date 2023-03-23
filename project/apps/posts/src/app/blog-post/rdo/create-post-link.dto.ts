import {ApiProperty} from '@nestjs/swagger';

export class CreatePostLinkDto {
  @ApiProperty({
    description: 'Optional post tags',
    example: ['tag1', 'tag2', 'tag3']
  })
  public tags: string[];

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
