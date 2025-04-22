import { Identifier } from 'sequelize/types';
import * as Models from '../models/index';

export class UsersCompanyDataAcceess {
  // create admin userSystem
  async adminCreateUserCompany(
    userId: number,
    companyId: number,
    side: string,
    respectfulSide: string,
  ) {
    const userCompany = await Models.UserCompany.create({
      userId,
      companyId,
      side,
      respectfulSide,
    });
    return userCompany;
  }

  // get all users
  async findAll() {
    const users = await Models.UserCompany.findAll({
      include: [Models.User, Models.Company],
      order: [['id', 'DESC']],
    });
    return users;
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

  async adminUpdateUserCompany(
    id: number,
    companyId: number,
    side: string,
    respectfulSide: string,
  ) {
    const userCompany = await Models.UserCompany.update(
      {
        companyId,
        side,
        respectfulSide,
      },
      {
        where: {
          id,
        },
      },
    );
    return userCompany;
  }

  async getProfile(id: Identifier) {
    const user = await Models.User.findByPk(id, {
      include: [Models.Media, Models.UserToken],
    });
    return user;
  }
  // find by id
  async findById(id: Identifier) {
    const user = await Models.UserCompany.findByPk(id, {
      include: [Models.User, Models.Company],
    });
    return user;
  }
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

  signOut(token: any) {
    Models.UserToken.destroy({ where: { jwtToken: token } });
  }

  async findUsersBydisiplinId(disciplineId: number): Promise<Models.User[]> {
    return await Models.User.findAll({
      where: { disciplineId },
      include: [Models.UserToken],
    });
  }

  async getLetterForUserCompany(userId: number, companyId: number) {
    const result = await Models.Letter.findOne({
      where: {
        receiverUserId: userId,
        receiverCompanyId: companyId,
      },
    });
    return result;
  }

  async deleteUserCompany(id: number) {
    await Models.UserCompany.destroy({
      where: { id },
    });
  }

  // fnd users company by companyId
  async findAllByCompanyId(companyId: number) {
    const userCompanies = await Models.UserCompany.findAll({
      where: {
        companyId,
      },
    });
    return userCompanies;
  }
}
