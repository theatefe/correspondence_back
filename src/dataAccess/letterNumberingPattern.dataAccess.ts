import * as Models from '../models/index';

export class LetterNumberingPatternDataAcceess {
  // create pattern
  async create(
    adminId: number,
    title: string,
    letterNumberingId: number,
    pattern: string,
    type: string,
  ) {
    const numberingPattern = await Models.LetterNumberingPattern.create({
      adminId,
      title,
      numberingId: letterNumberingId,
      pattern,
      type,
    });
    return numberingPattern;
  }
  // find pattern by id
  async findById(id: number) {
    const pattern = await Models.LetterNumberingPattern.findByPk(id, {
      include: [Models.LetterNumbering],
    });
    return pattern;
  }
  // update pattern
  async update(
    id: number,
    title: string,
    letterNumbering: number,
    pattern: string,
    type: string,
  ) {
    const numberingPattern = await Models.LetterNumberingPattern.update(
      {
        title,
        numberingId: letterNumbering,
        pattern,
        type,
      },
      {
        where: {
          id,
        },
      },
    );
    return numberingPattern;
  }
  // find all
  async findAll() {
    const list = await Models.LetterNumberingPattern.findAll({
      include: [Models.LetterNumbering, Models.Admin],
    });
    return list;
  }
  // delete
  async delete(id: any) {
    await Models.LetterNumberingPattern.destroy({
      where: {
        id,
      },
    });
  }
  // asign numbering to pattern
  async asignSerialNumberToTemplate(id: number, type: number) {
    const template = await Models.LetterNumberingPattern.update(
      {
        type,
        updatedAt: new Date(),
      },
      {
        where: {
          id,
        },
      },
    );
    return template;
  }
  // find by type
  async findByType(type:number){
    const pattern = await Models.LetterNumberingPattern.findOne({
      where:{
        type
      }
    });
    return pattern;
  }
}
