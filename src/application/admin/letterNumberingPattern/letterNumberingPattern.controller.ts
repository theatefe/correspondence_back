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
import { LetterNumberingPatternService } from './letterNumberingPattern.service';
import {
  LetterNumberingPatternDto,
  CreateLetterNumberingPatternDto,
  DeleteLetterNumberingPatternDto,
  UpdateLetterNumberingPatternDto,
  AssignTypeToTemplate
} from '../../../DTO/letterNumberingPattern.dto';

@ApiTags('admin letter numbering pattern')
@Controller('admins/letterNumberingPattern')
export class LetterNumberingPatternController {
  constructor(
    private readonly letterNumberingPatternService: LetterNumberingPatternService,
  ) {}
  // create *****************************************************
  @ApiOperation({ summary: 'create letter numbering pattern' })
  @ApiOkResponse({
    description: 'create letter numbering pattern status',
    type: LetterNumberingPatternDto,
  })
  @ApiBody({
    type: CreateLetterNumberingPatternDto,
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
    @Body() createLetterNumberingPatternDto: CreateLetterNumberingPatternDto,
  ): Promise<LetterNumberingPatternDto> {
    try {
      const numbering =
        await this.letterNumberingPatternService.createLetterNumberingPattern(
          res.locals.admin.id,
          createLetterNumberingPatternDto,
        );
      res.status(HttpStatus.OK).json(numbering);
      return;
    } catch (err) {
      throw err;
    }
  }
  // update *****************************************************
  @ApiOperation({ summary: 'update numbering pattern' })
  @ApiOkResponse({
    description: 'update letter numbering pattern status',
    type: Boolean,
  })
  @ApiBody({
    type: UpdateLetterNumberingPatternDto,
    description: 'create new letter numbering pattern',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Put('')
  @HttpCode(HttpStatus.OK)
  async updateLetterPattern(
    @Body() updateLetterNumberingPatternDto: UpdateLetterNumberingPatternDto,
  ): Promise<Boolean> {
    try {
      await this.letterNumberingPatternService.updateLetterNumberingPattern(
        updateLetterNumberingPatternDto,
      );
    return true;
    } catch (err) {
      throw err;
    }
  }
  // get by id *****************************************************
  @ApiOperation({ summary: 'get numbering pattern by id' })
  @ApiOkResponse({
    description: 'get letter numbering pattern by id',
    type: LetterNumberingPatternDto,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getLetterPatternById(
    @Res() res: Response,
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<Boolean> {
    try {
      const pattern = await this.letterNumberingPatternService.getPatternById(
        id,
      );
      res.status(HttpStatus.OK).json(pattern);
      return;
    } catch (err) {
      throw err;
    }
  }
  // get pattern list *****************************************
  @ApiOperation({ summary: 'get numbering pattern list' })
  @ApiOkResponse({
    description: 'get letter numbering pattern list',
    type: [LetterNumberingPatternDto],
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getLetterPatternList(
    @Res() res: Response,
  ): Promise<LetterNumberingPatternDto[]> {
    try {
      const list = await this.letterNumberingPatternService.getPatternList();
      res.status(HttpStatus.OK).json(list);
      return;
    } catch (err) {
      throw err;
    }
  }
  // delete pattern *****************************************
  @ApiOperation({ summary: 'delete numbering pattern' })
  @ApiOkResponse({
    description: 'delete letter numbering pattern status',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: DeleteLetterNumberingPatternDto,
    description: 'delete numbering pattern dto',
  })
  @Delete('')
  @HttpCode(HttpStatus.OK)
  async deleteLetterPatternList(
    @Res() res: Response,
    @Body() deleteLetterNumberingPatternDto: DeleteLetterNumberingPatternDto,
  ): Promise<boolean> {
    try {
      await this.letterNumberingPatternService.deleteNumberingPattern(
        deleteLetterNumberingPatternDto,
      );
      res.status(HttpStatus.OK);
      return;
    } catch (err) {
      throw err;
    }
  }
  // allocation of type to template  *****************
  @ApiOperation({ summary: 'Assign type to template' })
  @ApiOkResponse({
    description: 'Assign type to template status',
    type: Boolean,
  })
  @ApiBody({
    type: AssignTypeToTemplate,
    description: 'create new letter numbering pattern',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Put('/assignNumbering')
  @HttpCode(HttpStatus.OK)
  async siralTypeToTemplate(
    @Body() assignTypeToTemplate: AssignTypeToTemplate,
  ): Promise<Boolean> {
    try {
      await this.letterNumberingPatternService.assignTypeToTemplate(
        assignTypeToTemplate,
      );
    return true;
    } catch (err) {
      throw err;
    }
  }
}
