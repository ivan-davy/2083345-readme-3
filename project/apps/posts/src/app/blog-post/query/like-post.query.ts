import {IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {DEFAULT_POST_LIKE_ACTION} from '../blog-post.const';

export class LikePostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_LIKE_ACTION)
  @IsNumber()
  @IsOptional()
  public action = DEFAULT_POST_LIKE_ACTION;
}
