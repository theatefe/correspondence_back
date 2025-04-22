import * as Models from '../models/index';

export class LetterNumberingDataAcceess {
  // create letter numbering
  async create(
    adminId: number,
    title: string,
    startingNumber: number,
    growthNumber: number,
  ) {
    const letter = await Models.LetterNumbering.create({
      adminId,
      title,
      startingNumber,
      growthNumber,
    });
    return letter;
  }
  // find letter numbering by id
  async findById(id: number) {
    const numbering = await Models.LetterNumbering.findByPk(id);
    return numbering;
  }
  // update letter numbering
  async update(
    id: number,
    title: string,
    startingNumber: number,
    growthNumber: number,
  ) {
    const numbering = await Models.LetterNumbering.update(
      {
        title,
        startingNumber,
        growthNumber,
      },
      {
        where: {
          id,
        },
      },
    );
    return numbering;
  }
  // findAll
  async findAll() {
    const list = await Models.LetterNumbering.findAll({
      include: [
        {
          model: Models.Admin,
          as: 'admin',
        },
        {
          model: Models.Admin,
          as: 'updater',
        },
      ],
    });
    return list;
  }
  // delete
  async delete(id: number) {
    await Models.LetterNumbering.destroy({
      where: {
        id,
      },
    });
  }
  // check use in patern
  async checkUseNumberingINPattern(id: number) {
    const pattern = await Models.LetterNumberingPattern.findOne({
      where: {
        numberingId: id,
      },
    });
    return pattern;
  }
  // change active
  async changeActiveNumber(id: number, active: boolean, adminId: number) {
    const numbering = await Models.LetterNumbering.update(
      {
        active: active ? false : true,
        updaterId: adminId,
        updatedAt: new Date(),
      },
      {
        where: {
          id,
        },
      },
    );
    return numbering;
  }
  // findByType
  async findByType(type: number) {
    return await Models.LetterNumbering.findOne({
      where: {
        type,
      },
    });
  }
  // update last number
  async updateLastNumber(id: number, lastNumber: number) {
    await Models.LetterNumbering.update(
      {
        lastNumber,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
