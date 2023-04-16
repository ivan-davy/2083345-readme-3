import { ArgumentMetadata, BadRequestException, Inject, Scope } from "@nestjs/common";
import { PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {CreatePostTextDto} from '../dto/create-post-text.dto';
import {CreatePostImageDto} from '../dto/create-post-image.dto';
import {CreatePostVideoDto} from '../dto/create-post-video.dto';
import {CreatePostLinkDto} from '../dto/create-post-link.dto';
import {CreatePostQuoteDto} from '../dto/create-post-quote.dto';
import {PostTypeEnum} from '@project/shared/app-types';
import {CreatePostDto} from '../dto/create-post.dto';

// WIP?

export class CustomPostValidationPipe implements PipeTransform<any> {
  async transform(
    dto: CreatePostTextDto | CreatePostImageDto | CreatePostVideoDto | CreatePostLinkDto | CreatePostQuoteDto,
    { metatype, type }: ArgumentMetadata
  ): Promise<any> {
    if (type === 'body') {
      let errors = [];
      switch (dto.type) {
        case PostTypeEnum.Text:
          const postTextDto = plainToInstance(CreatePostTextDto, dto);
          errors.concat(await validate(postTextDto));
          break;
      }
      const postDto = plainToInstance(CreatePostDto, dto);
      console.log(postDto)
      errors.concat(await validate(postDto, {whitelist: true}));
      if (errors.length > 0) {
        throw new BadRequestException('OOOOOOOOOOOOOOOOO');
      }
    }

    return dto;
  }
}
