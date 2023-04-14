import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';
import {AUTH_USER_EMAIL_NOT_VALID} from '../authentication.const';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@mail.com'
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
