import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  DeleteCompanyDto,
  CompanyDto,
  companyObjDto,
} from './../../../DTO/company.dto';
import { CompanyDataAcceess } from './../../../dataAccess/company.dataAcces';
import { plainToInstance } from 'class-transformer';
import { UsersCompanyDataAcceess } from '../../../dataAccess/usersCompany.dataAccess';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyDataAcceess: CompanyDataAcceess,
    private readonly usersCompanyDataAcceess: UsersCompanyDataAcceess,
  ) {}
  //  list ************************************************
  async list(): Promise<CompanyDto[]> {
    const list = await this.companyDataAcceess.findAll();
    const companies = list.map((item) => companyObjDto(item));
    return companies;
  }

  // create company api  ******************************************************
  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyDto> {
    const { name, description, email, phoneNumber, address } = createCompanyDto;
    try {
      const company = await this.companyDataAcceess.create(
        name,
        description,
        email,
        phoneNumber,
        address,
      );
      return companyObjDto(company);
    } catch (err) {
      throw err;
    }
  }

  // update company api  ******************************************************
  async update(updateCompanyDto: UpdateCompanyDto): Promise<boolean> {
    const { id, name, description, email, phoneNumber, address } =
      updateCompanyDto;
    try {
      const company = await this.companyDataAcceess.findById(id);
      if (!company) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'COMPANY_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.companyDataAcceess.update(
        id,
        name,
        description,
        email,
        phoneNumber,
        address,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }
  //  findOne ************************************************
  async findOne(id: number): Promise<CompanyDto> {
    try {
      const company = await this.companyDataAcceess.findById(id);
      if (!company) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return plainToInstance(CompanyDto, company, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      throw err;
    }
  }
  // delete ***************************************************
  async delete(deleteCompanyDto: DeleteCompanyDto): Promise<Boolean> {
    const { id } = deleteCompanyDto;
    // check exist users company
    const usersCompany = await this.usersCompanyDataAcceess.findAllByCompanyId(
      id,
    );
    if (usersCompany.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'EXIST_USERS_COMPANY',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // delete company
    await this.companyDataAcceess.delete(id);
    return true;
  }
}
