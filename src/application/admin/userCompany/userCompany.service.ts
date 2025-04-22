import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import md5 = require('md5');
// DTO
import {
  CreateUserCompanyDto,
  UserCompanyDto,
  userCompanyObj,
  DeleteUserCompanyDto,
} from '../../../DTO/userCompany.dto';
// DATA ACCESSES
import { UsersCompanyDataAcceess } from '../../../dataAccess/usersCompany.dataAccess';
import { UsersDataAcceess } from '../../../dataAccess/users.dataAccess';
import { CompanyDataAcceess } from '../../../dataAccess/company.dataAcces';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
// ENUMS
import userTypeEnum from '../../../common/eNums/userType.enum';

@Injectable()
export class UserCompanyService {
  constructor(
    private readonly usersCompanyDataAcceess: UsersCompanyDataAcceess,
    private readonly usersDataAcceess: UsersDataAcceess,
    private readonly mediaDataAcceess: MediaDataAcceess,
    private readonly companyDataAcceess: CompanyDataAcceess,
  ) {}
  // create userCompany  ******************************************************
  async create(createUserCompanyDto: CreateUserCompanyDto): Promise<boolean> {
    const { userId, companyId, side, respectfulSide } = createUserCompanyDto;
    try {
      // validate user
      if (userId) {
        const user = await this.usersDataAcceess.findById(userId);
        if (!user) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'USER_NOT_FOUND',
            },
            HttpStatus.NOT_FOUND,
          );
        }
      }
       // validate user system
      if (userId) {
        const userSystem = await this.usersDataAcceess.checkUserSystemByUserId(userId);
        if (userSystem) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_ACCEPTABLE,
              error: 'USER_IS_USER_SYSTEM',
            },
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      }
      // validate company
      if (companyId) {
        const company = await this.companyDataAcceess.findById(companyId);
        if (!company) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'COMPANY_NOT_FOUND',
            },
            HttpStatus.NOT_FOUND,
          );
        }
      }
      // create user system
        await this.usersCompanyDataAcceess.adminCreateUserCompany(
          userId,
          companyId,
          side,
          respectfulSide,
        );
      return true;
    } catch (err) {
      throw err;
    }
  }
  // users companies list ******************************************************
  async list(): Promise<UserCompanyDto[]> {
    const userCompanies = await this.usersCompanyDataAcceess.findAll();
    return userCompanies.map((user) => userCompanyObj(user));
  }
  // find user company by id  **************************************************
  async findById(id: number): Promise<UserCompanyDto> {
    try {
      // validate user system
      const userCompany = await this.usersCompanyDataAcceess.findById(id);
      if (!userCompany) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'USER_COMPANY_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return userCompanyObj(userCompany);
    } catch (err) {
      throw err;
    }
  }
  // update user company ******************************************************
  async updateUserCompanyInfo(updateUserCompanyDto): Promise<boolean> {
    const { id, companyId, side, respectfulSide } = updateUserCompanyDto;
    // get user company by id
    const userCompany = await this.usersCompanyDataAcceess.findById(id);
    if (!userCompany) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USERCOMPANY_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // get exist company
    const company = await this.companyDataAcceess.findById(companyId);
    if (!company) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'COMPANY_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // update userCompany
      await this.usersCompanyDataAcceess.adminUpdateUserCompany(
        id,
        companyId,
        side,
        respectfulSide,
      );
    return true;
  }
  // delete user company ******************************************************
  async deleteUserCompany(
    deleteUserCompanyDto: DeleteUserCompanyDto,
  ): Promise<boolean> {
    const { id } = deleteUserCompanyDto;
    try {
      // validate user company
      const userCompany = await this.usersCompanyDataAcceess.findById(id);
      if (!userCompany) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'USERCOMPANY_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // exist letter for user company
      const existLetter =
        await this.usersCompanyDataAcceess.getLetterForUserCompany(
          userCompany.userId,
          userCompany.companyId,
        );
      if (existLetter) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'LETTER_IS_EXIST',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // DELETE
      await this.usersCompanyDataAcceess.deleteUserCompany(id);
      return true;
    } catch (err) {
      throw err;
    }
  }
}
