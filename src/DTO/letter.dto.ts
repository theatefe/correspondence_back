import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import letterTypes from '../common/eNums/letterType.enum';
import letterStatuses from '../common/eNums/letterStatus.enum';
import letterAttachTypes from '../common/eNums/letterAttachType.enum';
import letterConfidentialities from '../common/eNums/letterConfidentiality.enum';
import letterSignatureStatuses from '../common/eNums/letterSignatureStatus.enum';
import letterPriorities from '../common/eNums/letterPriority.enum';

import {
  LetterMediaDto,
  LetterMediaObj,
  CreateLetterMediaDto,
} from './letterMedia.dto';
import { UserDto, userObj } from './user.dto';
import { CompanyDto, companyObjDto } from './company.dto';
import {
  LetterTrackingInfoDto,
  letterTrackingObjDto,
} from './letterTracking.dto';
import { mediaObj } from './media.dto';

// OBJ *******************

export function letterObj(letter) {
  let letterMedias = [];
  if (letter.LetterMedias && letter.LetterMedias.length !== 0) {
    letterMedias = letter.LetterMedias.map((LetterMedia) =>
      LetterMediaObj(LetterMedia),
    );
  }
  let letterTrackings = [];
  if (letter.letterTrackings && letter.letterTrackings.length !== 0) {
    letterTrackings = letter.letterTrackings.map((tracking) =>
      letterTrackingObjDto(tracking),
    );
  }
  const sender = letter.senderUser ? userObj(letter.senderUser, null) : null;

  const senderCompany = letter.senderCompany
    ? companyObjDto(letter.senderCompany)
    : null;

  const signer = letter.signer ? userObj(letter.signer, null) : null;

  const reciver = letter.receiverUser
    ? userObj(letter.receiverUser, null)
    : null;

  const receiverCompany = letter.receiverCompany
    ? companyObjDto(letter.receiverCompany)
    : null;

  const type = Object.keys(letterTypes).find((item) =>
    letterTypes[item].code === letter.type ? letterTypes[item].text : null,
  );

  const priority = Object.keys(letterPriorities).find((item) =>
    letterPriorities[item].code === letter.priority
      ? letterPriorities[item].text
      : null,
  );

  const confidentiality = Object.keys(letterConfidentialities).find((item) =>
    letterConfidentialities[item].code === letter.confidentiality
      ? letterConfidentialities[item].text
      : null,
  );

  const signatureStatus = Object.keys(letterSignatureStatuses).find((item) =>
    letterSignatureStatuses[item].code === letter.signatureStatus
      ? letterSignatureStatuses[item].text
      : null,
  );

  const status = Object.keys(letterStatuses).find((item) =>
    letterStatuses[item].code === letter.status
      ? letterStatuses[item].text
      : null,
  );

  const signature = letter.signature ? mediaObj(letter.signature) : null;

  return {
    id: letter.id,
    number: letter.number,
    title: letter.title,
    content: letter.content,
    sender: sender,
    senderCompany: senderCompany,
    signer: signer,
    reciver: reciver,
    receiverCompany: receiverCompany,
    type: letterTypes[type].text,
    priority: letterPriorities[priority].text,
    confidentiality: letterConfidentialities[confidentiality].text,
    signatureStatus: letterSignatureStatuses[signatureStatus].text,
    signature: signature,
    status: letterStatuses[status].text,
    startDate: letter.startDate,
    attached: null,
    attachType: null,
    signedAt: letter.signedAt,
    numberedAt: letter.numberedAt,
    createdAt: letter.createdAt,
    letterMedias,
    letterTrackings,
  };
}

// CLASS *******************************
export class LetterDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  number: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ required: false, type: UserDto })
  sender: UserDto;

  @ApiProperty({ required: false, type: CompanyDto })
  senderCompany: CompanyDto;

  @ApiProperty({ required: false, type: UserDto })
  signer: UserDto;

  @ApiProperty({ required: false, type: UserDto })
  reciver: UserDto;

  @ApiProperty({ required: false, type: CompanyDto })
  receiverCompany: CompanyDto;

  @ApiProperty({ type: String })
  type: string;

  @ApiProperty({ type: Number })
  priority: number;

  @ApiProperty({ type: Number })
  confidentiality: number;

  @ApiProperty({ type: Number })
  signatureStatus: number;

  @ApiProperty({ type: Number })
  status: number;

  @ApiProperty({ type: String })
  startDate: string;

  @ApiProperty({ type: String })
  attached: string;

  @ApiProperty({ type: String })
  attachType: string;

  @ApiProperty({ type: String })
  signedAt: string;

  @ApiProperty({ type: String })
  numberedAt: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  createdAt: string;

  @ApiProperty({ isArray: true, type: LetterMediaDto })
  letterMedias: LetterMediaDto[];

  @ApiProperty({ isArray: true, type: LetterTrackingInfoDto })
  letterTrackings: LetterTrackingInfoDto[];
}

export class CreateLetterDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: Number })
  signerId: number;

  @ApiProperty({ type: Number })
  reciverUserId: number;

  @ApiProperty({ type: Number })
  reciverCompanyId: number;

  @ApiProperty({ type: Number })
  type: number;

  @ApiProperty({ type: Number })
  priority: number;

  @ApiProperty({ type: Number })
  confidentiality: number;

  @ApiProperty({ type: String })
  attached: string;

  @ApiProperty({ type: String })
  attachType: string;

  @ApiProperty({ isArray: true, type: CreateLetterMediaDto })
  LetterMedias: CreateLetterMediaDto[];
}

export class UpdateLetterDto {
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: Number })
  signerId: number;

  @ApiProperty({ type: Number })
  reciverUserId: number;

  @ApiProperty({ type: Number })
  reciverCompanyId: number;

  @ApiProperty({ type: Number })
  type: number;

  @ApiProperty({ type: Number })
  priority: number;

  @ApiProperty({ type: Number })
  confidentiality: number;

  @ApiProperty({ type: String })
  attached: string;

  @ApiProperty({ type: String })
  attachType: string;

  @ApiProperty({ isArray: true, type: CreateLetterMediaDto })
  LetterMedias: CreateLetterMediaDto[];
}

export class SignLetterDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  letterId: number;
}

export class NumberingLetterDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  letterId: number;
}
