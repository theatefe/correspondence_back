import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import md5 = require('md5');
import { AdminDto, adminObj } from '../../DTO/admin.dto';
import { Jwt } from '../../common/helpers/jwt.helper';
import { Tools } from '../../common/helpers/tools.helper';
import { AdminsDataAcceess } from '../../dataAccess/admins.dataAccess';

@Injectable()
export class AdminsService {
  constructor(
    private readonly adminsDataAcceess: AdminsDataAcceess,
    private readonly jwt: Jwt,
    private readonly tools: Tools,
  ) {}
  // login ***************************************************
  async login(username: string, password: string): Promise<AdminDto> {
    const admin = await this.adminsDataAcceess.findByUserName(username);
    if (!admin) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'LOGIN_FAILD',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (admin.password !== md5(password)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'LOGIN_FAILD',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const tokenValues = {
      adminId: admin.id,
      type: 'admin',
    };
    const token = this.jwt.signer(tokenValues, 86400 * 365);
    await this.adminsDataAcceess.updateJwtToken(token, admin.id);
    return adminObj(await this.adminsDataAcceess.findByUserName(username));
  }
  // updatePassword **************************************
  async updatePassword(oldPassword, newPassword, username) {
    const admin = await this.adminsDataAcceess.findByUserName(username);
    if (admin.password === md5(oldPassword)) {
      await this.adminsDataAcceess.updatePassword(admin.id, md5(newPassword));
      return;
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'UPDATE PASSWORD FORBIDEN',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  // logout *********************************************
  async logOut(adminId) {
    await this.adminsDataAcceess.logOut(adminId);
    return;
  }
}
