import {
  Controller,
  HttpStatus,
  HttpCode,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
import { LetterService } from './letter.service';
import {
  LetterDto,
  CreateLetterDto,
  SignLetterDto,
  NumberingLetterDto,
  UpdateLetterDto,
} from '../../../DTO/letter.dto';
import {
  LetterTrackingDto,
  letterTrackingObjDto
} from '../../../Dto/letterTracking.dto';

@ApiTags('user letter')
@Controller('user/letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}
  // create *****************************************************
  @ApiOperation({ summary: 'create letter' })
  @ApiOkResponse({
    description: 'create letter status',
    type: LetterDto,
  })
  @ApiBody({
    type: CreateLetterDto,
    description: 'create new letter',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createLetter(
    @Res() res: Response,
    @Body() createLetterDto: CreateLetterDto,
  ): Promise<LetterDto> {
    try {
      const letter = await this.letterService.createLetter(
        createLetterDto,
        res.locals.user.id,
      );
      res.status(HttpStatus.OK).json(letter);
      return;
    } catch (err) {
      throw err;
    }
  }
  // sign letter **************************************************
  @ApiOperation({ summary: 'sign letter' })
  @ApiOkResponse({
    description: 'sign letter status',
    type: LetterDto,
  })
  @ApiBody({
    type: SignLetterDto,
    description: 'sign letter',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Post('/sign')
  @HttpCode(HttpStatus.OK)
  async signLetter(
    @Res() res: Response,
    @Body() signLetterDto: SignLetterDto,
  ): Promise<LetterDto> {
    try {
      const signStatus = await this.letterService.signLetter(
        signLetterDto,
        res.locals.user.id,
      );
      res.status(HttpStatus.OK).json(signStatus);
      return;
    } catch (err) {
      throw err;
    }
  }
  // numbering letter **************************************************
  @ApiOperation({ summary: 'numbering letter' })
  @ApiOkResponse({
    description: 'numbering letter status',
    type: LetterDto,
  })
  @ApiBody({
    type: NumberingLetterDto,
    description: 'numbering letter',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Post('/numbering')
  @HttpCode(HttpStatus.OK)
  async NumberingLetter(
    @Res() res: Response,
    @Body() numberingLetterDto: NumberingLetterDto,
  ): Promise<LetterDto> {
    try {
      const numberingStatus = await this.letterService.numberingLetter(
        numberingLetterDto,
        res.locals.user.id,
      );
      res.status(HttpStatus.OK).json(numberingStatus);
      return;
    } catch (err) {
      throw err;
    }
  }
  // update *****************************************************
  @ApiOperation({ summary: 'update letter' })
  @ApiOkResponse({
    description: 'update letter status',
    type: Boolean,
  })
  @ApiBody({
    type: UpdateLetterDto,
    description: 'create new letter',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Put('')
  @HttpCode(HttpStatus.OK)
  async updateLetter(
    @Res() res: Response,
    @Body() updateLetterDto: UpdateLetterDto,
  ): Promise<boolean> {
    try {
      const updated = await this.letterService.updateLetter(
        updateLetterDto,
        res.locals.user.id,
      );
      res.status(HttpStatus.OK).json(updated);
      return;
    } catch (err) {
      throw err;
    }
  }
  // get letter by id *******************************************
  @ApiOperation({ summary: 'get letter by id' })
  @ApiOkResponse({
    description: 'letter info',
    type: LetterDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async getLetterDetail(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<LetterDto> {
    const letter = await this.letterService.getDetail(id);
    return letter;
  }
  // get list of send letters *********************************
  @ApiOperation({ summary: 'list of send letters' })
  @ApiOkResponse({
    description: 'send letters',
    type: [LetterDto],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/cartable/sended')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async getListOfsendLetters(@Res() res: Response): Promise<LetterDto[]> {
    const letters = await this.letterService.getSendLetters(res.locals.user.id);
    res.status(200).json(letters);
    return;
  }
  // get list of received letters *********************************
  @ApiOperation({ summary: 'list of received letters' })
  @ApiOkResponse({
    description: 'received letters',
    type: [LetterTrackingDto],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/cartable/received')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async getListOfReceivedLetters(
    @Res() res: Response,
  ): Promise<LetterTrackingDto[]> {
    const letters = await this.letterService.getRecivedLetters(res.locals.user.id);
    res.status(200).json(letters);
    return;
  }
  // get count of list of received letters ******************************
  @ApiOperation({ summary: 'count list of received letters' })
  @ApiOkResponse({
    description: 'received letters count',
    type: Number,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/cartable/received/count')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async geCounttListOfReceivedLetters(
    @Res() res: Response,
  ): Promise<number> {
    const lettersCount = await this.letterService.getCountRecivedLetters(res.locals.user.id);
    res.status(200).json(lettersCount);
    return;
  }
  // get list of draft letters *********************************
  @ApiOperation({ summary: 'list of draft letters' })
  @ApiOkResponse({
    description: 'draft letters',
    type: [LetterDto],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/cartable/draft')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async getListOfDraftLetters(@Res() res: Response): Promise<LetterDto[]> {
    const letters = await this.letterService.getDraftLetters(
      res.locals.user.id,
    );
    res.status(200).json(letters);
    return;
  }
  // get list of internal letters *********************************
  @ApiOperation({ summary: 'list of internal letters' })
  @ApiOkResponse({
    description: 'internal letters',
    type: [LetterDto],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/catable/internal')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async getListOfInternalLetters(@Res() res: Response): Promise<LetterDto[]> {
    const letters = await this.letterService.getInternalLetters(
      res.locals.user.id,
    );
    res.status(200).json(letters);
    return;
  }
  // get list of issued letters *********************************
  @ApiOperation({ summary: 'list of issued letters' })
  @ApiOkResponse({
    description: 'issued letters',
    type: [LetterDto],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/catable/issued')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async getListOfIssuedLetters(@Res() res: Response): Promise<LetterDto[]> {
    const letters = await this.letterService.getIssuedLetters(
      res.locals.user.id,
    );
    res.status(200).json(letters);
    return;
  }
}
