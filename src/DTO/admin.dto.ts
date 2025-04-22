import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsNumberString } from 'class-validator';
import { MediaDto, mediaObj } from './media.dto';

// OBJ *******************

export function adminObj(admin) {
  let avatar = null;
  if (admin.Media) {
    avatar = mediaObj(admin.Media);
  }

  return {
    id: admin.id,
    username: admin.username,
    name: admin.name,
    lastName: admin.lastName,
    mobile: admin.mobile,
    email: admin.email,
    roleId: admin.roleId,
    token: admin.jwtToken,
    avatar,
  };
}
export function adminInfoObj(admin) {
  return {
    id: admin.id,
    userName: admin.userName,
    name: admin.name,
    roleId: admin.roleId,
    lastName: admin.lastName,
  };
}

// CLASS *******************

export class AdminLoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
export class AdminUpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  newPassword: string;
}
export class AdminForgetPasswordDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: String })
  mobile: string;
}
export class AdminRecoverPasswordDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  code: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  newPassword: string;
}
export class AdminDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  mobile: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  roleId: number;

  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: MediaDto })
  avatar: MediaDto;

  @ApiProperty({ type: String })
  token: string;
}
export class AdminInfoDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  roleId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;
}
