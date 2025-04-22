import * as Models from '../models/index';
import { Op } from 'sequelize';
// Enums
import letterSignatureStatusesEnums from '../common/eNums/letterSignatureStatus.enum';
import letterStatusesEnums from '../common/eNums/letterStatus.enum';
import letterTypesEnums from '../common/eNums/letterType.enum';

export class LetterDataAcceess {
  // create letter
  async createLetter(
    senderUserId: number,
    title: string,
    content: string,
    signerId: number,
    receiverCompanyId: number,
    receiverUserId: number,
    type: number,
    priority: number,
    confidentiality: number,
    attached: string,
    attachType: string,
  ) {
    const letter = await Models.Letter.create({
      senderUserId,
      title,
      content,
      signerId,
      receiverCompanyId,
      receiverUserId,
      type,
      priority,
      confidentiality,
      attached,
      attachType,
    });
    return letter;
  }
  // find letter by id
  async findById(id: number) {
    const letter = await Models.Letter.findByPk(id);
    return letter;
  }
  // sign letter
  async signLetter(id: number, signerId: number, signatureMediaId: number) {
    const signLetterStatus = await Models.Letter.update(
      {
        signatureStatus: letterSignatureStatusesEnums.signed.code,
        signatureId: signatureMediaId,
        signedAt: new Date(),
        status: letterStatusesEnums.signed.code,
      },
      {
        where: {
          id,
          signerId,
        },
      },
    );
    return signLetterStatus;
  }
  // change status letter
  async changeStatus(id: number, status: number) {
    const letter = await Models.Letter.update(
      {
        status,
      },
      {
        where: {
          id,
        },
      },
    );
    return letter;
  }
  // change Signiture Status letter
  async unSignLetter(id: number, signatureStatus: number) {
    const letter = await Models.Letter.update(
      {
        signatureStatus,
        signedAt: null,
        signatureId: null,
      },
      {
        where: {
          id,
        },
      },
    );
    return letter;
  }
  // update letter
  async update(
    id: number,
    title: string,
    content: string,
    signerId: number,
    reciverUserId: number,
    reciverCompanyId: number,
    type: number,
    priority: number,
    confidentiality: number,
    attached: string,
    attachType: string,
  ) {
    const letter = await Models.Letter.update(
      {
        title,
        content,
        signerId,
        reciverUserId,
        reciverCompanyId,
        type,
        priority,
        confidentiality,
        attached,
        attachType,
      },
      {
        where: {
          id,
        },
      },
    );
    return letter;
  }
  // async find letter full
  async getFullInfoLetter(id: number) {
    const letter = await Models.Letter.findByPk(id, {
      include: [
        {
          model: Models.LetterMedia,
          include: [Models.Media],
        },
        {
          model: Models.LetterTracking,
          include: [
            {
              model: Models.User,
              as: 'fromUser',
            },
            {
              model: Models.User,
              as: 'toUser',
            },
            { model: Models.LetterTrackingMedia, include: [Models.Media] },
          ],
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'senderUser',
        },
        {
          model: Models.Company, // شرکت فرستنده
          as: 'senderCompany',
        },
        {
          model: Models.User, // امضاکننده نامه
          as: 'signer',
        },
        {
          model: Models.User, // گیرنده نامه
          as: 'receiverUser',
        },
        {
          model: Models.Company, // شرکت گیرنده
          as: 'receiverCompany',
        },
        {
          model: Models.Media, // امضای نامه
          as: 'signature',
        },
      ],
    });
    return letter;
  }
  // get send Letters list
  async sendLetters(userId: number) {
    const letters = await Models.Letter.findAll({
      where: {
        senderUserId: userId,
      },
      include: [
        {
          model: Models.LetterMedia,
          include: [Models.Media],
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'senderUser',
        },
        {
          model: Models.Company, // شرکت فرستنده
          as: 'senderCompany',
        },
        {
          model: Models.User, // امضاکننده نامه
          as: 'signer',
        },
        {
          model: Models.User, // گیرنده نامه
          as: 'receiverUser',
        },
        {
          model: Models.Company, // شرکت گیرنده
          as: 'receiverCompany',
        },
        {
          model: Models.Media, // امضای نامه
          as: 'signature',
        },
      ],
      order: [['id', 'DESC']],
    });
    return letters;
  }
  // get draft letters list
  async draftLetters(userId: number) {
    const list = await Models.Letter.findAll({
      where: {
        senderUserId: userId,
        status: letterStatusesEnums.registered.code,
      },
      include: [
        {
          model: Models.LetterMedia,
          include: [Models.Media],
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'senderUser',
        },
        {
          model: Models.Company, // شرکت فرستنده
          as: 'senderCompany',
        },
        {
          model: Models.User, // امضاکننده نامه
          as: 'signer',
        },
        {
          model: Models.User, // گیرنده نامه
          as: 'receiverUser',
        },
        {
          model: Models.Company, // شرکت گیرنده
          as: 'receiverCompany',
        },
        {
          model: Models.Media, // امضای نامه
          as: 'signature',
        },
      ],
      order: [['id', 'DESC']],
    });
    return list;
  }
  // get recived Letters list
  async recivedLetters(userId: number) {
    const list = await Models.Letter.findAll({
      where: {
        receiverUserId: userId,
      },
      include: [
        {
          model: Models.LetterMedia,
          include: [Models.Media],
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'senderUser',
        },
        {
          model: Models.Company, // شرکت فرستنده
          as: 'senderCompany',
        },
        {
          model: Models.User, // امضاکننده نامه
          as: 'signer',
        },
        {
          model: Models.User, // گیرنده نامه
          as: 'receiverUser',
        },
        {
          model: Models.Company, // شرکت گیرنده
          as: 'receiverCompany',
        },
        {
          model: Models.Media, // امضای نامه
          as: 'signature',
        },
      ],
      order: [['id', 'DESC']],
    });
    return list;
  }
  // get recived tracking letter
  async recivedTrackings(userId: number) {
    const list = await Models.LetterTracking.findAll({
      where: {
        toUserId: userId,
      },
      include: [
        {
          model: Models.Letter,
          include: [
            {
              model: Models.User, // فرستنده نامه
              as: 'senderUser',
            },
            {
              model: Models.Company, // شرکت فرستنده
              as: 'senderCompany',
            },
            {
              model: Models.User, // امضاکننده نامه
              as: 'signer',
            },
            {
              model: Models.User, // گیرنده نامه
              as: 'receiverUser',
            },
            {
              model: Models.Company, // شرکت گیرنده
              as: 'receiverCompany',
            },
            {
              model: Models.Media, // امضای نامه
              as: 'signature',
            },
          ],
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'fromUser',
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'toUser',
        },
      ],
      order: [['id', 'DESC']],
    });
    return list;
  }
  // get last letter
  async findLastLetter(type: number) {
    const letter = await Models.Letter.findAll({
      where: {
        type,
      },
    });
    return letter;
  }
  // get internal letter
  async internalLetters(userId: number) {
    const list = await Models.Letter.findAll({
      where: {
        [Op.or]: [{ receiverUserId: userId }, { senderUserId: userId }],
        type: letterTypesEnums.internal.code,
      },
      include: [
        {
          model: Models.LetterMedia,
          include: [Models.Media],
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'senderUser',
        },
        {
          model: Models.Company, // شرکت فرستنده
          as: 'senderCompany',
        },
        {
          model: Models.User, // امضاکننده نامه
          as: 'signer',
        },
        {
          model: Models.User, // گیرنده نامه
          as: 'receiverUser',
        },
        {
          model: Models.Company, // شرکت گیرنده
          as: 'receiverCompany',
        },
        {
          model: Models.Media, // امضای نامه
          as: 'signature',
        },
      ],
      order: [['id', 'DESC']],
    });
    return list;
  }
  // get issued letter
  async issuedLetters(userId: number) {
    const list = await Models.Letter.findAll({
      where: {
        [Op.or]: [{ receiverUserId: userId }, { senderUserId: userId }],
        type: letterTypesEnums.issued.code,
      },
      include: [
        {
          model: Models.LetterMedia,
          include: [Models.Media],
        },
        {
          model: Models.User, // فرستنده نامه
          as: 'senderUser',
        },
        {
          model: Models.Company, // شرکت فرستنده
          as: 'senderCompany',
        },
        {
          model: Models.User, // امضاکننده نامه
          as: 'signer',
        },
        {
          model: Models.User, // گیرنده نامه
          as: 'receiverUser',
        },
        {
          model: Models.Company, // شرکت گیرنده
          as: 'receiverCompany',
        },
        {
          model: Models.Media, // امضای نامه
          as: 'signature',
        },
      ],
      order: [['id', 'DESC']],
    });
    return list;
  }
  // numbering letter
  async numberingLetter(id: number, number: number) {
    const numbering = await Models.Letter.update(
      {
        number,
        status: letterStatusesEnums.numbered.code,
        numberedAt: new Date(),
      },
      {
        where: {
          id,
        },
      },
    );
    return numbering;
  }
}
