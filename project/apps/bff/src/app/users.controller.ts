import {Body, Controller, Get, HttpStatus, Param, Post, Req, UseFilters} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {LoginUserDto} from './dto/login-user.dto';
import {ApplicationServiceURL} from './app.config';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiResponse} from '@nestjs/swagger';
import {UserRdo} from '../../../users/src/app/authentication/rdo/user.rdo';
import {LoggedUserRdo} from '../../../users/src/app/authentication/rdo/logged-user.rdo';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Login successful.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Login failed.',
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists.',
  })
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User data provided.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.'
  })
  @Get(':id')
  public async getUser(
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${id}`);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get new access/refresh tokens'
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
