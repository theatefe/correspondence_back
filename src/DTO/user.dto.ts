import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import genderEnum from './../common/eNums/gender.enum ';
import userStatusesEnum from './../common/eNums/userStatus.enum';
import { DATE } from 'sequelize';

// OBJ *******************

export function userObj(user, token) {
  // gender
  const userGenderText = Object.keys(genderEnum).find((item) =>
    genderEnum[item].code === user.gender ? genderEnum[item].text : null,
  );
  // status
  const userActiveStatus = Object.keys(userStatusesEnum).find((item) =>
    userStatusesEnum[item].code === user.activeStatus
      ? userStatusesEnum[item].text
      : null,
  );
  return {
    id: user.id,
    respectfulTitle: user.respectfulTitle,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
    gender: genderEnum[userGenderText].text,
    activeStatus: userStatusesEnum[userActiveStatus].text,
    deActiveReason: user.deActiveReason,
    createdAt: user.createdAt,
    token: token,
  };
}
// CLASS *******************

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  respectfulTitle: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  mobile: string;

  @ApiProperty({ type: String })
  gender: string;

  @ApiProperty({ type: String })
  activeStatus: string;

  @ApiProperty({ type: String })
  deActiveReason: string;

  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class CreateUserDto {
  @ApiProperty({ type: String })
  respectfulTitle: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  mobile: string;
}

export class UpdateUserDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  respectfulTitle: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  mobile: string;
}

export class DeleteUserDto {
  @ApiProperty({ type: Number })
  id: number;
}
