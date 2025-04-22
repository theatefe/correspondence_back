import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import md5 = require('md5');
// DTO
import {
  CreateUserSystemDto,
  UserSystemDto,
  userSystemObj,
  UpdateUserSystemDto,
  AdminChangePasswordDto,
} from '../../../DTO/userSystem.dto';
// DATA ACCESSES
import { UsersSystemDataAcceess } from '../../../dataAccess/usersSystem.dataAccess';
import { UsersDataAcceess } from '../../../dataAccess/users.dataAccess';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
// ENUMS
import userTypeEnum from '../../../common/eNums/userType.enum';

@Injectable()
export class UserSystemService {
  constructor(
    private readonly usersSystemDataAcceess: UsersSystemDataAcceess,
    private readonly usersDataAcceess: UsersDataAcceess,
    private readonly mediaDataAcceess: MediaDataAcceess,
  ) {}
  // create userSystem   ******************************************************
  async create(createUserSystemDto: CreateUserSystemDto): Promise<boolean> {
    const { userId, username, password, userType, side, respectfulSide } =
      createUserSystemDto;
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
      // validate user type
      const type = Object.keys(userTypeEnum).some(
        (key) => userTypeEnum[key].code === userType,
      );
      if (!type) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'USER_TYPE_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // create user system
      await this.usersSystemDataAcceess.adminCreateUserSystem(
        userId,
        username,
        md5(password),
        userType,
        side,
        respectfulSide,
      );
      return true;
    } catch (err) {
      throw err;
    }
  }
  // users system list ************************************************************
  async list(): Promise<UserSystemDto[]> {
    const usersSystemList = await this.usersSystemDataAcceess.findAll();
    const list = usersSystemList.map((user) => userSystemObj(user));
    return list;
  }
  // find user system by id  **************************************************
  async findById(id: number): Promise<UserSystemDto> {
    try {
      // validate user system
      const userSystem = await this.usersSystemDataAcceess.findById(id);
      if (!userSystem) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'USER_SYSTEM_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return userSystemObj(userSystem);
    } catch (err) {
      throw err;
    }
  }
  // update user system ******************************************************
  async updateUserInfo(
    updateUserSystemDto: UpdateUserSystemDto,
  ): Promise<boolean> {
    const { id, username, userType, side, respectfulSide } =
      updateUserSystemDto;
    // get user by id
    const user = await this.usersSystemDataAcceess.findById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (userType || userType === 0) {
      const checkUserType = Object.keys(userTypeEnum).some(
        (key) => userTypeEnum[key].code === userType,
      );
      if (!checkUserType) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'USERTYPE_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
    await this.usersSystemDataAcceess.adminUpdateUserSystem(
      id,
      username,
      userType,
      side,
      respectfulSide,
    );
    return true;
  }
  // update password user system *********************************************
  async updatePassword(
    adminChangePasswordDto: AdminChangePasswordDto,
  ): Promise<boolean> {
    const { id, newPassword } = adminChangePasswordDto;
    try {
      // validate user system
      const userSystem = await this.usersSystemDataAcceess.findById(id);
      if (!userSystem) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'USERSYSTEM_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.usersSystemDataAcceess.updatePassword(id, md5(newPassword));
      return true;
    } catch (err) {
      throw err;
    }
  }
}
