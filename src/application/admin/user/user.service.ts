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
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { respectfulTitle, name, lastName, mobile } = createUserDto;
    try {
      // check duplicate mobile
      const existMobile = await this.usersDataAcceess.findByMobile(mobile);
      if (existMobile) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'شماره موبایل تکراری است',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      // create user
      const user = await this.usersDataAcceess.adminCreateUser(
        respectfulTitle,
        name,
        lastName,
        mobile,
      );
      return userObj(user, null);
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
    const { id, respectfulTitle, name, lastName, mobile } = updateUserDto;
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
    await this.usersDataAcceess.adminUpdateUser(
      id,
      respectfulTitle,
      name,
      lastName,
      mobile,
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
