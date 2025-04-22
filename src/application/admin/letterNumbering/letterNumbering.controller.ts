import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Put,
  Res,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
import { LetterNumberingService } from './letterNumbering.service';
import {
  LetterNumberingDto,
  CreateLetterNumberingDto,
  DeleteLetterNumberingDto,
  UpdateLetterNumberingDto,
  ChangeActiveLetterNumberingDto,
} from '../../../DTO/letterNumbering.dto';

@ApiTags('admin letter Numbering')
@Controller('admins/letterNumbering')
export class LetterNumberingController {
  constructor(
    private readonly letterNumberingService: LetterNumberingService,
  ) {}
  // create *****************************************************
  @ApiOperation({ summary: 'create letter numbering' })
  @ApiOkResponse({
    description: 'create letter numbering status',
    type: LetterNumberingDto,
  })
  @ApiBody({
    type: CreateLetterNumberingDto,
    description: 'create new letter numbering',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createLetterNumbering(
    @Res() res: Response,
    @Body() createLetterNumberingDto: CreateLetterNumberingDto,
  ): Promise<LetterNumberingDto> {
    try {
      const numbering = await this.letterNumberingService.createLetterNumbering(
        res.locals.admin.id,
        createLetterNumberingDto,
      );
      res.status(HttpStatus.OK).json(numbering);
      return;
    } catch (err) {
      throw err;
    }
  }
  // update *****************************************************
  @ApiOperation({ summary: 'update numbering' })
  @ApiOkResponse({
    description: 'update letter numbering status',
    type: Boolean,
  })
  @ApiBody({
    type: UpdateLetterNumberingDto,
    description: 'update letter numbering',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Patch('')
  @HttpCode(HttpStatus.OK)
  async changeActiveLetterNumbering(
    @Body() updateLetterNumberingDto: UpdateLetterNumberingDto,
  ): Promise<boolean> {
    try {
      await this.letterNumberingService.updateLetterNumbering(
        updateLetterNumberingDto,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }
  // change active *****************************************************
  @ApiOperation({ summary: 'change active numbering' })
  @ApiOkResponse({
    description: 'update active numbering status',
    type: Boolean,
  })
  @ApiBody({
    type: ChangeActiveLetterNumberingDto,
    description: 'update letter numbering',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Put('')
  @HttpCode(HttpStatus.OK)
  async updateLetterNumbering(
    @Res() res: Response,
    @Body() changeActiveLetterNumberingDto: ChangeActiveLetterNumberingDto,
  ): Promise<any> {
    try {
      await this.letterNumberingService.changeActiveLetterNumbering(
        res.locals.admin.id,
        changeActiveLetterNumberingDto,
      );
      res.status(200).json(true);
    } catch (err) {
      throw err;
    }
  }
  // get *****************************************************
  @ApiOperation({ summary: 'get numbering list' })
  @ApiOkResponse({
    description: 'get letter numbering list',
    type: [LetterNumberingDto],
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getLetterNumberingList(@Res() res: Response) {
    try {
      const list = await this.letterNumberingService.getLetterNumberingList();
      res.status(200).json(list);
    } catch (err) {
      throw err;
    }
  }
  // delete *****************************************************
  @ApiOperation({ summary: 'delete numbering' })
  @ApiOkResponse({
    description: 'delete letter numbering status',
    type: Boolean,
  })
  @ApiBody({
    type: DeleteLetterNumberingDto,
    description: 'update letter numbering',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Delete('')
  @HttpCode(HttpStatus.OK)
  async deleteLetterNumbering(
    @Body() deleteLetterNumberingDto: DeleteLetterNumberingDto,
  ): Promise<boolean> {
    try {
      await this.letterNumberingService.deleteLetterNumbering(
        deleteLetterNumberingDto,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }
}
