import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
// dto
import { UserDto, userObj } from './user.dto';
import { MediaDto, mediaObj } from './media.dto';
// enum
import userTypeEnum from './../common/eNums/userType.enum';

// OBJ *******************

export function userSystemObj(userSystem, token = null) {
  const user = userSystem.user ? userObj(userSystem.user, token) : null;
  const signature = userSystem.Media ? mediaObj(userSystem.Media) : null;
  // user type
  const userTypeText = Object.keys(userTypeEnum).find((item) =>
    userTypeEnum[item].code === userSystem.userType
      ? userTypeEnum[item].text
      : null,
  );
  return {
    id: userSystem.id,
    user,
    username: userSystem.username,
    userType: userTypeEnum[userTypeText].text,
    side: userSystem.side,
    respectfulSide: userSystem.respectfulSide,
    signature: signature,
    createdAt: userSystem.createdAt,
  };
}
// CLASS *******************

export class UserSystemDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  userType: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  side: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  respectfulSide: string;

  @ApiProperty({ type: MediaDto })
  signature: MediaDto;

  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class CreateUserSystemDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  userType: number;

  @ApiProperty({ type: String, required: false })
  side: string;

  @ApiProperty({ type: String, required: false })
  respectfulSide: string;
}

export class UpdateUserSystemDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  userType: number;

  @ApiProperty({ type: String, required: false })
  side: string;

  @ApiProperty({ type: String, required: false })
  respectfulSide: string;
}

export class UserSystemLoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  fireBaseToken: string;
}
export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  newPassword: string;
}
export class AdminChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  newPassword: string;
}
export class AdminChangeStatusDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  newStatus: boolean;
}
export class UserSystemRecoverPasswordDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  code: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  newPassword: string;
}
