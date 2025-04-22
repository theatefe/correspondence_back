import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { LetterNumberingDto, letterNumberingObj } from './letterNumbering.dto';
import { AdminInfoDto, adminInfoObj } from './admin.dto';
import letterTypes from '../common/eNums/letterType.enum';

// OBJ *******************

export function letterNumberingPatternObj(letterNumberingPattern) {
  // company
  const letterNumbering = letterNumberingPattern.LetterNumbering
    ? letterNumberingObj(letterNumberingPattern.LetterNumbering)
    : null;
  // admin
  const admin = letterNumberingPattern.admin
    ? adminInfoObj(letterNumberingPattern.admin)
    : null;
  // type
  const type =
    letterNumberingPattern.type !== null
      ? Object.keys(letterTypes).find((item) =>
          letterTypes[item].code === letterNumberingPattern.type
            ? letterTypes[item].text
            : null,
        )
      : null;
  return {
    id: letterNumberingPattern.id,
    admin: admin,
    letterNumbering: letterNumbering,
    title: letterNumberingPattern.title,
    pattern: letterNumberingPattern.pattern,
    type: letterNumberingPattern.type !== null ? letterTypes[type].text : null,
    active: letterNumbering.active,
    createdAt: letterNumberingPattern.createdAt,
    updatedAt: letterNumbering.updatedAt,
  };
}
// CLASS *******************

export class LetterNumberingPatternDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ required: false, type: AdminInfoDto })
  admin: AdminInfoDto;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ required: false, type: LetterNumberingDto })
  letterNumbering: LetterNumberingDto;

  @ApiProperty({ type: String })
  pattern: string;

  @ApiProperty({ type: String })
  type: string;

  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class CreateLetterNumberingPatternDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Number })
  letterNumberingId: number;

  @ApiProperty({ type: String })
  pattern: string;

  @ApiProperty({ type: String })
  type: string;
}

export class UpdateLetterNumberingPatternDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Number })
  letterNumbering: number;

  @ApiProperty({ type: String })
  pattern: string;

  @ApiProperty({ type: String })
  type: string;
}

export class DeleteLetterNumberingPatternDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;
}

export class AssignTypeToTemplate {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  type: number;
}
