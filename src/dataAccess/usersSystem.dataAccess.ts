import { Identifier } from 'sequelize/types';
import * as Models from '../models/index';

export class UsersSystemDataAcceess {
  // CREATE USER SYSTEM BY ADMIN  *********************
  async adminCreateUserSystem(
    userId: number,
    username: string,
    password: string,
    userType: number,
    side: string,
    respectfulSide: string,
  ) {
    const userSystem = await Models.UserSystem.create({
      userId,
      username,
      password,
      side,
      respectfulSide,
      userType,
    });
    return userSystem;
  }
  // END ***********************************************
  // GET ALL USER SYSTEM  ******************************
  async findAll() {
    const users = await Models.UserSystem.findAll({
      include: [Models.User],
      order: [['id', 'DESC']],
    });
    return users;
  }
  // END ************************************************
  // UPDATE USER SYSTEM BY ADMIN ************************
  async adminUpdateUserSystem(
    id: number,
    username: string,
    userType: number,
    side: string,
    respectfulSide: string,
  ) {
    const user = await Models.UserSystem.update(
      {
        username,
        userType,
        side,
        respectfulSide,
      },
      {
        where: {
          id,
        },
      },
    );
    return user;
  }
  // END ************************************************
  // FIND USER SYSTEM BY USERNAME ***********************
  async findByUserName(username: string) {
    const userSystem = await Models.UserSystem.findOne({
      where: {
        username,
      },
      include: [Models.User, Models.Media],
    });
    return userSystem;
  }
  // END *************************************************
  // FIND USER SYSTEM BY USERID **************************
  async findByUserId(userId: number) {
    const userSystem = await Models.UserSystem.findOne({
      where: {
        userId,
      },
      include: [Models.User],
    });
    return userSystem;
  }
  // END *************************************************
  // FIND USER SYSTEM BY ID ******************************
  async findById(id: Identifier) {
    const user = await Models.UserSystem.findByPk(id, {
      include: [Models.User],
    });
    return user;
  }
  // END *************************************************
  // UPDATE PASSWOED USER SYSTEM *************************
  async updatePassword(id: number, newPassword: string) {
    await Models.UserSystem.update(
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
  // END *************************************************
}
