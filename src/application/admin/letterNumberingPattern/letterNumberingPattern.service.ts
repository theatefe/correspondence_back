import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bluebirdPromise = require('bluebird');
// DTO
import {
  CreateLetterNumberingPatternDto,
  UpdateLetterNumberingPatternDto,
  letterNumberingPatternObj,
  LetterNumberingPatternDto,
  DeleteLetterNumberingPatternDto,
  AssignTypeToTemplate,
} from '../../../DTO/letterNumberingPattern.dto';
// DATA ACCESS
import { LetterNumberingDataAcceess } from '../../../dataAccess/letterNumbering.dataAccess';
import { LetterNumberingPatternDataAcceess } from '../../../dataAccess/letterNumberingPattern.dataAccess';
// ENUMS
import letterTypesEnum from '../../../common/eNums/letterType.enum';

@Injectable()
export class LetterNumberingPatternService {
  constructor(
    private readonly letterNumberingPatternDataAcceess: LetterNumberingPatternDataAcceess,
    private readonly letterNumberingDataAcceess: LetterNumberingDataAcceess,
  ) {}
  // CREATE LETTER NUMBERING PATTERN ***************************
  async createLetterNumberingPattern(
    adminId: number,
    createLetterNumberingPatternDto: CreateLetterNumberingPatternDto,
  ): Promise<LetterNumberingPatternDto> {
    const { title, letterNumberingId, pattern, type } =
      createLetterNumberingPatternDto;
    // check numbering
    const existNumbering = await this.letterNumberingDataAcceess.findById(
      letterNumberingId,
    );
    if (!existNumbering) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'NUMBERING_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // check type
    if (type !== null) {
      const checkType = Object.keys(letterTypesEnum).some(
        (key) => letterTypesEnum[key].code == type,
      );
      if (!checkType) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'TYPE_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
    // create
    const numberingPattern =
      await this.letterNumberingPatternDataAcceess.create(
        adminId,
        title,
        letterNumberingId,
        pattern,
        type,
      );
    const result = await this.letterNumberingPatternDataAcceess.findById(
      numberingPattern.id,
    );
    return letterNumberingPatternObj(result);
  }
  // UPDATE LETTER NUMBERING PATTERN ***************************
  async updateLetterNumberingPattern(
    updateLetterNumberingPatternDto: UpdateLetterNumberingPatternDto,
  ): Promise<boolean> {
    const { id, title, letterNumbering, pattern, type } =
      updateLetterNumberingPatternDto;
    // FIND NUMBERING PATTERN
    const numberingPattern =
      await this.letterNumberingPatternDataAcceess.findById(id);
    if (!numberingPattern) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PATTERN_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // FIND NUMBERING
    const numbering = await this.letterNumberingDataAcceess.findById(id);
    if (!numbering) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'NUMBERING_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK TYPE
    const checkType = Object.keys(letterTypesEnum).some(
      (key) => letterTypesEnum[key].code === type,
    );
    if (!checkType) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'TYPE_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // UPDATE NUMBERING
    await this.letterNumberingPatternDataAcceess.update(
      id,
      title,
      letterNumbering,
      pattern,
      type,
    );
    return true;
  }
  // GET PATTERN BY ID *****************************************
  async getPatternById(id: any): Promise<LetterNumberingPatternDto> {
    // FIND NUMBERING PATTERN
    const numberingPattern =
      await this.letterNumberingPatternDataAcceess.findById(id);
    if (!numberingPattern) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PATTERN_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return letterNumberingPatternObj(numberingPattern);
  }
  // GET PATTERNS LIST ******************************************
  async getPatternList(): Promise<LetterNumberingPatternDto[]> {
    // FIND PATTERNS
    const list = await this.letterNumberingPatternDataAcceess.findAll();
    return list.map((item) => letterNumberingPatternObj(item));
  }
  // DELETE PATTERN *********************************************
  async deleteNumberingPattern(
    deleteLetterNumberingPatternDto: DeleteLetterNumberingPatternDto,
  ): Promise<boolean> {
    const { id } = deleteLetterNumberingPatternDto;
    // FIND NUMBERING PATTERN
    const numberingPattern =
      await this.letterNumberingPatternDataAcceess.findById(id);
    if (!numberingPattern) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PATTERN_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // DELETE PATTERN
    await this.letterNumberingPatternDataAcceess.delete(id);
    return true;
  }
  // ASIGN TYPE TO TEMPLATE *****************************
  async assignTypeToTemplate(
    assignTypeToTemplate: AssignTypeToTemplate,
  ): Promise<boolean> {
    const { id, type } = assignTypeToTemplate;
    // check exist template
    const numberingPattern =
      await this.letterNumberingPatternDataAcceess.findById(id);
    if (!numberingPattern) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'TEMPLATE_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // check type
    const checkType = Object.keys(letterTypesEnum).some(
      (key) => letterTypesEnum[key].code == type,
    );
    if (!checkType) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'TYPE_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // asign serial numbering to template
    await this.letterNumberingPatternDataAcceess.asignSerialNumberToTemplate(
      id,
      type,
    );
    return true;
  }
}
