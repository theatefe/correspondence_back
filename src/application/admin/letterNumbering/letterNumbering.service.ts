import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bluebirdPromise = require('bluebird');
// DTO
import {
  CreateLetterNumberingDto,
  UpdateLetterNumberingDto,
  letterNumberingObj,
  LetterNumberingDto,
  DeleteLetterNumberingDto,
  ChangeActiveLetterNumberingDto,
} from '../../../DTO/letterNumbering.dto';
// DATA ACCESS
import { LetterNumberingDataAcceess } from '../../../dataAccess/letterNumbering.dataAccess';

@Injectable()
export class LetterNumberingService {
  constructor(
    private readonly letterNumberingDataAcceess: LetterNumberingDataAcceess,
  ) {}
  // CREATE LETTER NUMBERING ***************************
  async createLetterNumbering(
    adminId: number,
    createLetterNumberingDto: CreateLetterNumberingDto,
  ): Promise<LetterNumberingDto> {
    const { title, startingNumber, growthNumber } = createLetterNumberingDto;
    const numbering = await this.letterNumberingDataAcceess.create(
      adminId,
      title,
      startingNumber,
      growthNumber,
    );
    return letterNumberingObj(numbering);
  }
  // UPDATE LETTER NUMBERING *****************************
  async updateLetterNumbering(
    updateLetterNumberingDto: UpdateLetterNumberingDto,
  ): Promise<boolean> {
    const { id, title, startingNumber, growthNumber } =
      updateLetterNumberingDto;
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
    // CHECK USE NUMBERRING
    const checkUseNumbering = await this.letterNumberingDataAcceess.checkUseNumberingINPattern(id);
    if(checkUseNumbering){
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'این شماره سریال در الگو استفاده شده است',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // UPDATE NUMBERING
    await this.letterNumberingDataAcceess.update(
      id,
      title,
      startingNumber,
      growthNumber,
    );
    return true;
  }
  // CHANGE ACTIVE LETTER NUMBERING *************************
  async changeActiveLetterNumbering(
    adminId: number,
    changeActiveLetterNumberingDto: ChangeActiveLetterNumberingDto,
  ): Promise<boolean> {
    const { id } = changeActiveLetterNumberingDto;
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
    // CHECK USE NUMBERRING
    const checkUseNumbering = await this.letterNumberingDataAcceess.checkUseNumberingINPattern(id);
    if(checkUseNumbering){
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'این شماره سریال در الگو استفاده شده است',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // UPDATE active
    await this.letterNumberingDataAcceess.changeActiveNumber(
      id,
      numbering.active,
      adminId,
    );
    return true;
  }
  // LETTER NUMBERING LIST ***********************************
  async getLetterNumberingList(): Promise<LetterNumberingDto[]> {
    const list = await this.letterNumberingDataAcceess.findAll();
    const arr = list.map((item) => letterNumberingObj(item));
    return arr;
  }
  // DELETE LETTER NUMBERING **********************************
  async deleteLetterNumbering(
    deleteLetterNumberingDto: DeleteLetterNumberingDto,
  ): Promise<boolean> {
    const { id } = deleteLetterNumberingDto;
    await this.letterNumberingDataAcceess.delete(id);
    return true;
  }
}
