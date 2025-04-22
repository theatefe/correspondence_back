import * as Models from '../models/index';

export class AdminsDataAcceess {
  async findByUserName(username) {
    const admin = await Models.Admin.findOne({
      where: {
        username,
      },
      include: [
        Models.Media,
        {
          model: Models.Role,
          include: [Models.Permission],
        },
      ],
    });
    return admin;
  }
  async findById(id) {
    const admin = await Models.Admin.findByPk(id, {
      include: [
        Models.Media,
        {
          model: Models.Role,
          include: [Models.Permission],
        },
      ],
    });
    return admin;
  }
  async findByMobile(mobile) {
    const admin = await Models.Admin.findOne({
      where: {
        mobile: mobile,
      },
    });
    return admin;
  }
  async updateJwtToken(jwtToken, id) {
    await Models.Admin.update(
      {
        jwtToken,
      },
      {
        where: {
          id,
        },
      },
    );
  }
  async updatePassword(id, newPassword) {
    await Models.Admin.update(
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
  async logOut(id) {
    await Models.Admin.update(
      {
        jwtToken: '',
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
