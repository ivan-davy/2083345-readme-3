import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ApplicationServiceURL} from './app.config';


@Controller('files')
export class FileController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @Get(':fileId')
  public async getFileById(@Param('fileId') fileId) {
    const { data } = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${fileId}`));
    return data
  }

  @Post('upload')
  public async uploadFile(
    @Req() req: Request,
    @Body() file,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, file, {
      headers: {
        'Content-Type': req.headers['content-type']
      }
    });
    return data;
  }
}
