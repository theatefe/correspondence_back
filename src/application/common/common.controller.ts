import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  HttpException,
  Res,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Get,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiHeader,
  ApiConsumes,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CommonService } from './common.service';
import { MediaDto, mediaObj } from '../../DTO/media.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/middlewares/filename.middleware';
import pathes from '../../config/pathes';

@ApiTags('commons')
@Controller('commons')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
  // upload file *********************************************************************************
  @ApiOkResponse({
    description: 'user default info',
    type: [MediaDto],
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        dist: { type: 'string' },
      },
    },
  })
  @Post('/uploadFile')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in signIn',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${pathes.staticFiles}${pathes.uploadedFiles}`,
        filename: editFileName,
      }),
    }),
  )
  async uploadMultipleFiles(@UploadedFile() file, @Body() body): Promise<any> {
    try {
      if (file) {
        const media = await this.commonService.upload(file.filename, body.dist);
        return media;
      }
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'BAD_REQUEST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // delete uploaded media   *******************
  @ApiOperation({ summary: 'delete uploaded media' })
  @ApiNotFoundResponse({ description: 'file not found' })
  @ApiInternalServerErrorResponse({
    description: 'delete file faild',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'status',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in signIn',
  })
  @Delete('/:mediaId')
  @HttpCode(HttpStatus.OK)
  async secoundDepartments(
    @Param(
      'mediaId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    mediaId: number,
  ): Promise<boolean> {
    try {
      const status = await this.commonService.deleteMedia(mediaId);
      return status;
    } catch (err) {
      throw err;
    }
  }
  // tinymceUpload file *********************************************************************************
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/tinymceUpload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${pathes.staticFiles}${pathes.tinymceUpload}`,
        filename: editFileName,
      }),
    }),
  )
  async tinymceUpload(
    @UploadedFile() file,
    @Res() res: Response,
  ): Promise<any> {
    if (file) {
      res.json({
        location: `${pathes.siteUrl}${pathes.tinymceUpload}${file.filename}`,
      });
      return;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'BAD_REQUEST',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
