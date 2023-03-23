import {ApiProperty} from '@nestjs/swagger';

export class CreatePostImageDto {
  @ApiProperty({
    description: 'Status (draft/posted)',
    example: 'draft'
  })
  public status: string;

  @ApiProperty({
    description: 'Fixed post type',
    example: 'text'
  })
  public type: string;

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
    description: 'Post image link',
    example: '/imgs/image.png'
  })
  public imageLink: string;
}
