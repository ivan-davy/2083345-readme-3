import {IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';

const DEFAULT_POST_COUNT_LIMIT = 50;

export class CommentQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
