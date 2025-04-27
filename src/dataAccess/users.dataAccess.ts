import { Identifier } from 'sequelize/types';
import * as Models from '../models/index';

export class UsersDataAcceess {
  // create admin userSystem
  async adminCreateUser(
    respectfulTitle: string,
    name: string,
    lastName: string,
    mobile: string,
  ) {
    const user = await Models.User.create({
      respectfulTitle,
      name,
      lastName,
      mobile,
    });
    return user;
  }

  // get all users
  async findAll() {
    const users = await Models.User.findAll({
      order: [['id', 'DESC']],
    });
    return users;
  }
  async createUser(
    mobile: string,
    username: string,
    password: string,
    companyId: number,
    disciplineId: number,
    name: string,
    lastName: string,
    userType: number,
    email: string,
    gender: number,
  ) {
    const user = await Models.User.create({
      mobile,
      username,
      password,
      companyId,
      disciplineId,
      name,
      lastName,
      userType,
      email,
      gender,
      activeStatus: true,
    });
    return user;
  }

  async changeActiveStatus(activeStatus: boolean, id: number) {
    const user = await Models.User.update(
      {
        activeStatus,
      },
      {
        where: {
          id,
        },
      },
    );

    return user;
  }
  async adminUpdateUser(
    id,
    respectfulTitle,
    name,
    lastName,
    mobile,
  ) {
    const user = await Models.User.update(
      {
        respectfulTitle,
        name,
        lastName,
        mobile,
      },
      {
        where: {
          id,
        },
      },
    );
    return user;
  }
  async getProfile(id: Identifier) {
    const user = await Models.User.findByPk(id, {
      include: [Models.Media, Models.UserToken],
    });
    return user;
  }
  async findByMobile(mobile: string) {
    const user = await Models.User.findOne({
      where: {
        mobile,
      },
    });
    return user;
  }
  async findByUserName(username: string) {
    const user = await Models.User.findOne({
      where: {
        username: username,
      },
      include: [Models.UserToken],
    });
    return user;
  }
  async findByEmail(email: string) {
    const user = await Models.User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
  // FIND USER BY ID  ********************************
  async findById(id: Identifier) {
    const user = await Models.User.findByPk(id, {
      include: [Models.UserToken],
    });
    return user;
  }
  // END *********************************************
  async findUserToken(jwtToken: string) {
    const token = await Models.UserToken.findOne({
      where: {
        jwtToken,
      },
      include: [
        {
          model: Models.User,
        },
      ],
    });

    return token;
  }
  // CREATE USER TOKEN ********************************
  async createUserToken(
    userId: number,
    ip: any,
    lastConfirmationId: number,
    jwtToken: string,
    secretKey: string,
    fireBaseToken: string,
  ) {
    const userToken = await Models.UserToken.create({
      userId,
      ip,
      jwtToken,
      lastConfirmationId,
      device: '',
      secretKey,
      fireBaseToken,
    });
    return userToken;
  }
  // END *************************************************
  // DELETE USER **************************************
  async deleteUser(id) {
    await Models.User.destroy({
      where: {
        id,
      },
    });
  }
  // END **********************************************
  // CHECK USERCOMPANY ********************************
  async checkUserSystemByUserId(userId) {
    const userSystem = await Models.UserSystem.findOne({
      where: {
        userId,
      },
    });
    return userSystem;
  }
  // END **********************************************
  async updatePassword(id: number, newPassword: string) {
    await Models.User.update(
      {
        password: newPassword,
      },
      {
        where: {
          id,
        },
      },
    );
  }
  signOut(token: any) {
    Models.UserToken.destroy({ where: { jwtToken: token } });
  }

  async findUsersBydisiplinId(disciplineId: number): Promise<Models.User[]> {
    return await Models.User.findAll({
      where: { disciplineId },
      include: [Models.UserToken],
    });
  }
}
