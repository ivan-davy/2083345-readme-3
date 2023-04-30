import {Body, Controller, Get, Param, Post, Req, UseFilters} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {LoginUserDto} from './dto/login-user.dto';
import {ApplicationServiceURL} from './app.config';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  @Get(':id')
  public async getUser(
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

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
