import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
// dto
import { UserDto, userObj } from './user.dto';
import { LetterDto, letterObj } from './letter.dto';
import {
  LetterTrackingMediaDto,
  letterTrackingMediaObj,
  CreateLetterTrackingMediaDto,
} from './letterTrackingMedia.dto';
//enums
import letterTrackingTypes from '../common/eNums/letterTrackingType.enum';
import letterTrackingStatuses from '../common/eNums/letterTrackingStatus.enum';
// OBJ *******************

export function letterTrackingObjDto(track) {
  let letterTrackingMedias = [];
  if (track.letterTrackingMedias && track.letterTrackingMedias.length !== 0) {
    letterTrackingMedias = track.letterTrackingMedias.map((trackingMedia) =>
      letterTrackingMediaObj(trackingMedia),
    );
  }
  const fromUser = track.fromUser ? userObj(track.fromUser, null) : null;
  const toUser = track.toUser ? userObj(track.toUser, null) : null;
  const letter = track.letter ? letterObj(track.letter) : null;
  // type
  const typeText = Object.keys(letterTrackingTypes).find((item) =>
    letterTrackingTypes[item].code === track.type
      ? letterTrackingTypes[item].text
      : null,
  );
  // status
  const statusText = Object.keys(letterTrackingStatuses).find((item) =>
    letterTrackingStatuses[item].code === track.status
      ? letterTrackingStatuses[item].text
      : null,
  );
  return {
    id: track.id,
    description: track.title,
    letter,
    fromUser,
    toUser,
    type: track.type,
    typeText: letterTrackingTypes[typeText].text,
    status: track.status,
    statusText: letterTrackingStatuses[statusText].text,
    seenAt: track.seenAt,
    createdAt: track.createdAt,
    letterTrackingMedias,
  };
}

// CLASS *******************

export class LetterTrackingDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ required: false, type: LetterDto })
  letter: LetterDto;

  @ApiProperty({ required: false, type: UserDto })
  fromUser: UserDto;

  @ApiProperty({ required: false, type: UserDto })
  toUser: UserDto;

  @ApiProperty({ type: Number })
  type: number;

  @ApiProperty({ type: String })
  typeText: string;

  @ApiProperty({ type: Number })
  status: number;

  @ApiProperty({ type: String })
  statusText: string;

  @ApiProperty({ type: String })
  seenAt: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  createdAt: string;

  @ApiProperty({ isArray: true, type: LetterTrackingMediaDto })
  letterTrackingMedias: LetterTrackingMediaDto[];
}

export class LetterTrackingInfoDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ required: false, type: UserDto })
  fromUser: UserDto;

  @ApiProperty({ required: false, type: UserDto })
  toUser: UserDto;

  @ApiProperty({ type: Number })
  type: number;

  @ApiProperty({ type: String })
  typeText: string;

  @ApiProperty({ type: Number })
  status: number;

  @ApiProperty({ type: String })
  statusText: string;

  @ApiProperty({ type: String })
  seenAt: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  createdAt: string;

  @ApiProperty({ isArray: true, type: LetterTrackingMediaDto })
  letterTrackingMedias: LetterTrackingMediaDto[];
}

export class CreateLetterTrackingDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  letterId: number;

  @ApiProperty({ type: Number })
  toUserId: number;

  @ApiProperty({ type: Number })
  type: number;

  @ApiProperty({ isArray: true, type: CreateLetterTrackingMediaDto })
  letterTrackingMedias: CreateLetterTrackingMediaDto[];
}

export class SeenLetterTrackingDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;
}


