import {ApiProperty} from '@nestjs/swagger';
import {PostStatusEnum, PostTypeEnum, UserInterface} from '@project/shared/app-types';
import {Expose, Type} from 'class-transformer';
import {UserRdo} from './user.rdo';

export class PostImageRdo {
  @ApiProperty({
    description: 'Optional post tags',
    example: ['tag1', 'tag2', 'tag3']
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post image link',
    example: '/imgs/image.png'
  })
  @Expose()
  public imageLink: string;

  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  @Type(() => UserRdo)
  public origAuthor: UserRdo;

  @Expose()
  public creationDate: string;

  @Expose()
  public postDate: string;

  @Expose()
  public likesQty: number;

  @Expose()
  public commentsQty: number;

  @Expose()
  public type: PostTypeEnum;

  @Expose()
  public status: PostStatusEnum;

  @Expose()
  public isReposted: boolean;
}


