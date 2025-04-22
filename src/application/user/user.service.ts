import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import md5 = require('md5');

import {
  UpdatePasswordDto,
  UserSystemDto,
  UserSystemLoginDto,
  userSystemObj,
} from '../../DTO/userSystem.dto';
import { Jwt } from '../../common/helpers/jwt.helper';

import { Tools } from '../../common/helpers/tools.helper';
import { MediaDataAcceess } from '../../dataAccess/media.dataAccess';
import { UsersDataAcceess } from '../../dataAccess/users.dataAccess';
import { UsersSystemDataAcceess } from '../../dataAccess/usersSystem.dataAccess';

@Injectable()
export class UserService {
  constructor(
    private readonly usersDataAcceess: UsersDataAcceess,
    private readonly mediaDataAcceess: MediaDataAcceess,
    private readonly usersSystemDataAcceess: UsersSystemDataAcceess,
    private readonly jwt: Jwt,
    private readonly tools: Tools,
  ) {}
  // LOGOUT FUNCTION **************************************************
  async signOut(token: any) {
    this.usersDataAcceess.signOut(token);
    return;
  }
  // LOGIN FUNCTION ***************************************************
  async login(
    userSystemLoginDto: UserSystemLoginDto,
    ip: any,
  ): Promise<UserSystemDto> {
    const { username, password, fireBaseToken } = userSystemLoginDto;
    // FIND USERSYSTEM BY USERNAME
    const userSystem = await this.usersSystemDataAcceess.findByUserName(
      username,
    );
    if (!userSystem) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'USERNAME_IS_NOT_VALID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    // FIND USER BY USERID
    const user = await this.usersDataAcceess.findById(userSystem.userId);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    // CHECK PASSWORD
    if (userSystem.password !== md5(password)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'LOGIN_FAILD',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    // VALID TOKEN
    const tokenValues = {
      username: userSystem.username,
      type: 'user',
    };
    const token = this.jwt.signer(tokenValues, 86400 * 365);
    const secretKey = this.tools.securePassword(16);
    await this.usersDataAcceess.createUserToken(
      user.id,
      ip,
      null,
      token,
      secretKey,
      fireBaseToken,
    );
    // RETURN INFO
    return userSystemObj(userSystem, token);
  }
  // GET USER INFO  ***************************************************
  async getProfile(userId: number): Promise<UserSystemDto> {
    // FIND USER SYSTEM
    const userSystem = await this.usersSystemDataAcceess.findByUserId(userId);
    return userSystemObj(userSystem, null);
  }
  // GET USER SYSTEM LIST ***********************************************
  async getList(): Promise<UserSystemDto[]> {
    const list = await this.usersSystemDataAcceess.findAll();
    return list.map((item) => userSystemObj(item));
  }
}
