import {
  Controller,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  Param,
  Get,
  Post,
  Body,
  Put,
  Res,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
//SERVICE
import { LetterTrackingService } from './letterTracking.service';
// DTO
import {
  LetterTrackingDto,
  CreateLetterTrackingDto,
  SeenLetterTrackingDto,
} from '../../../DTO/letterTracking.dto';

@ApiTags('user letter tracking')
@Controller('user/letterTracking')
export class LetterTrackingController {
  constructor(private readonly letterTrackingService: LetterTrackingService) {}
  // create *****************************************************
  @ApiOperation({ summary: 'create letter tracking' })
  @ApiOkResponse({
    description: 'create letter tracking status',
    type: Boolean,
  })
  @ApiBody({
    type: CreateLetterTrackingDto,
    description: 'create new letter tracking',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createLetterTracking(
    @Res() res: Response,
    @Body() createLetterTrackingDto: CreateLetterTrackingDto,
  ): Promise<boolean> {
    try {
      const result = await this.letterTrackingService.createLetterTracking(
        createLetterTrackingDto,
        res.locals.user.id,
      );
      res.status(HttpStatus.OK).json(result);
      return;
    } catch (err) {
      throw err;
    }
  }
  // seen *****************************************************
  @ApiOperation({ summary: 'seen letter tracking' })
  @ApiOkResponse({
    description: 'seen letter tracking status',
    type: Boolean,
  })
  @ApiBody({
    type: SeenLetterTrackingDto,
    description: 'seen letter tracking',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Put()
  @HttpCode(HttpStatus.OK)
  async seenLetterTracking(
    @Res() res: Response,
    @Body() seenLetterTrackingDto: SeenLetterTrackingDto,
  ): Promise<boolean> {
    try {
      const result = await this.letterTrackingService.seenLetterTracking(
        seenLetterTrackingDto,
        res.locals.user.id,
      );
      res.status(HttpStatus.OK).json(result);
      return;
    } catch (err) {
      throw err;
    }
  }
}
