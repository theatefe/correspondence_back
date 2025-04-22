import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CompanyDto, companyObjDto } from './company.dto';
import { UserDto, userObj } from './user.dto';

// OBJ *******************

export function userCompanyObj(userCompany) {
  // company
  const company = userCompany.company
    ? companyObjDto(userCompany.company)
    : null;
  // user
  const user = userCompany.user ? userObj(userCompany.user, null) : null;
  return {
    id: userCompany.id,
    user: user,
    company: company,
    side: userCompany.side,
    respectfulSide: userCompany.respectfulSide,
    createdAt: userCompany.createdAt,
  };
}
// CLASS *******************

export class UserCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @IsNotEmpty()
  @ApiProperty({ type: CompanyDto })
  company: CompanyDto;

  @ApiProperty({ type: String })
  side: string;

  @ApiProperty({ type: String })
  respectfulSide: string;

  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class CreateUserCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  companyId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  side: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  respectfulSide: string;
}

export class UpdateUserCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  companyId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  side: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  respectfulSide: string;
}

export class DeleteUserCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;
}
