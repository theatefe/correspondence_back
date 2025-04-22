import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

// CLASS *******************

export function companyObjDto(company){
  return {
    id: company.id,
    name: company.name,
    description: company.description,
    email : company.email,
    phoneNumber: company.phoneNumber,
    address: company.address,
    createdAt:company.createdAt,
  }
}

export class CreateCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, description: 'توضیحات' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'ایمیل' })
  email: string;

  @ApiProperty({ type: String, description: 'شماره تلفن' })
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'آدرس' })
  address: string;
}

export class UpdateCompanyDto extends CreateCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;
}
export class DeleteCompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;
}

export class CompanyDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String, description: 'توضیحات' })
  @Expose()
  description: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'ایمیل' })
  @Expose()
  email: string;

  @ApiProperty({ type: String, description: 'شماره تلفن' })
  @Expose()
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'آدرس' })
  @Expose()
  address: string;

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;

}
