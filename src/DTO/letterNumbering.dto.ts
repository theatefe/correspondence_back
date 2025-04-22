import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AdminInfoDto, adminInfoObj } from './admin.dto';

// OBJ *******************

export function letterNumberingObj(letterNumbering) {
  const admin = letterNumbering.admin
    ? adminInfoObj(letterNumbering.admin)
    : null;
  const updater = letterNumbering.updater
    ? adminInfoObj(letterNumbering.updater)
    : null;
  return {
    id: letterNumbering.id,
    admin: admin,
    title: letterNumbering.title,
    startingNumber: letterNumbering.startingNumber,
    growthNumber: letterNumbering.growthNumber,
    active: letterNumbering.active,
    createdAt: letterNumbering.createdAt,
    updater: updater,
    updatedAt: letterNumbering.updatedAt,
  };
}
// CLASS *******************

export class LetterNumberingDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ required: false, type: AdminInfoDto })
  admin: AdminInfoDto;

  @ApiProperty({ required: false, type: AdminInfoDto })
  updater: AdminInfoDto;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Number })
  startingNumber: number;

  @ApiProperty({ type: Number })
  growthNumber: number;

  @ApiProperty({ type: Boolean })
  active: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}

export class CreateLetterNumberingDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  startingNumber: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  growthNumber: number;
}

export class UpdateLetterNumberingDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  startingNumber: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  growthNumber: number;
}

export class ChangeActiveLetterNumberingDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;
}

export class DeleteLetterNumberingDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;
}
