import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import md5 = require('md5');
import {
  userObj,
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  DeleteUserDto,
} from '../../../DTO/user.dto';
import { UsersDataAcceess } from '../../../dataAccess/users.dataAccess';
import { UsersSystemDataAcceess } from '../../../dataAccess/usersSystem.dataAccess';
import genderEnum from '../../../common/eNums/gender.enum ';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import userTypeEnum from '../../../common/eNums/userType.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly usersDataAcceess: UsersDataAcceess,
    private readonly usersSystemDataAcceess: UsersSystemDataAcceess,
    private readonly mediaDataAcceess: MediaDataAcceess,
  ) {}
  // create user   ******************************************************
  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const {
      respectfulTitle,
      name,
      lastName,
      fatherName,
      nationalCode,
      dateOfBirth,
      email,
      mobile,
      gender,
      education,
      address,
      maritalStatus,
    } = createUserDto;
    try {
      // validate duplicated mobile
      // if (mobile) {
      //   const mobileCheck = await this.usersDataAcceess.findByMobile(mobile);
      //   if (mobileCheck) {
      //     throw new HttpException(
      //       {
      //         status: HttpStatus.NOT_FOUND,
      //         error: 'MOBILE_IS_DUPLICATE',
      //       },
      //       HttpStatus.NOT_FOUND,
      //     );
      //   }
      // }
      // validate duplicated email
      if (email) {
        const emailCheck = await this.usersDataAcceess.findByEmail(email);
        if (emailCheck) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'EMAIL_IS_DUPLICATE',
            },
            HttpStatus.NOT_FOUND,
          );
        }
      }
      // validate gender men women and no selected
      if (gender || gender === 0) {
        const checkGender = Object.keys(genderEnum).some(
          (key) => genderEnum[key].code === gender,
        );
        if (!checkGender) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'GENDER_NOT_FOUND',
            },
            HttpStatus.NOT_FOUND,
          );
        }
      }
      // create user
      await this.usersDataAcceess.adminCreateUser(
        respectfulTitle,
        name,
        lastName,
        fatherName,
        nationalCode,
        dateOfBirth,
        email,
        mobile,
        gender,
        education,
        address,
        maritalStatus,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }
  // users list ************************************************************
  async usersList(): Promise<UserDto[]> {
    const usersList = await this.usersDataAcceess.findAll();
    const list = usersList.map((user) => userObj(user, null));
    return list;
  }
  // find user by id  **************************************************
  async findById(id: number): Promise<UserDto> {
    try {
      // validate user
      const user = await this.usersDataAcceess.findById(id);
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'USER_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return userObj(user, null);
    } catch (err) {
      throw err;
    }
  }
  // update user ******************************************************
  async updateUserInfo(updateUserDto: UpdateUserDto): Promise<boolean> {
    const { id, respectfulTitle, name, lastName, email, mobile, gender } =
      updateUserDto;
    // get user by id
    const user = await this.usersDataAcceess.findById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (gender || gender === 0) {
      const checkGender = Object.keys(genderEnum).some(
        (key) => genderEnum[key].code === gender,
      );
      if (!checkGender) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'GENDER_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
    await this.usersDataAcceess.adminUpdateUser(
      id,
      respectfulTitle,
      name,
      lastName,
      email,
      mobile,
      gender,
    );
    return true;
  }
  // delete user ***********************************************************
  async deleteUser(deleteUserDto: DeleteUserDto): Promise<boolean> {
    const { id } = deleteUserDto;
    // check exist user system
    const userSystem = await this.usersSystemDataAcceess.findByUserId(id);
    if (userSystem) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'USER_SYSTEM_NOT_BE_DELETE',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // delete user
    await this.usersDataAcceess.deleteUser(id);
    return true;
  }
}
