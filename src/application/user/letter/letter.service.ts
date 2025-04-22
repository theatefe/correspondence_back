import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bluebirdPromise = require('bluebird');
// DTO
import {
  letterObj,
  LetterDto,
  CreateLetterDto,
  UpdateLetterDto,
  SignLetterDto,
  NumberingLetterDto,
} from '../../../DTO/letter.dto';
import {
  letterTrackingObjDto,
  LetterTrackingDto,
} from '../../../Dto/letterTracking.dto';
// DATA ACCESS
import { LetterDataAcceess } from '../../../dataAccess/letter.dataAccess';
import { LetterTrackingDataAcceess } from '../../../dataAccess/letterTracking.dataAccess';
import { LetterMediaDataAcceess } from '../../../dataAccess/letterMedia.dataAccess';
import { UsersSystemDataAcceess } from '../../../dataAccess/usersSystem.dataAccess';
import { UsersCompanyDataAcceess } from '../../../dataAccess/usersCompany.dataAccess';
import { CompanyDataAcceess } from '../../../dataAccess/company.dataAcces';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import { LetterNumberingDataAcceess } from '../../../dataAccess/letterNumbering.dataAccess';
// ENUMS
import letterTypesEnum from '../../../common/eNums/letterType.enum';
import letterPrioritiesEnum from '../../../common/eNums/letterPriority.enum';
import letterConfidentialitiesEnum from '../../../common/eNums/letterConfidentiality.enum';
import letterSignatureStatusesEnum from '../../../common/eNums/letterSignatureStatus.enum';
import letterStatusesEnums from '../../../common/eNums/letterStatus.enum';
import letterAttachTypesEnums from '../../../common/eNums/letterAttachType.enum';
import userTypesEnums from '../../../common/eNums/userType.enum';
import letterTrackingTypes from '../../../common/eNums/letterTrackingType.enum';
import letterTrackingStatuses from 'src/common/eNums/letterTrackingStatus.enum';

@Injectable()
export class LetterService {
  constructor(
    private readonly letterDataAcceess: LetterDataAcceess,
    private readonly letterTrackingDataAcceess: LetterTrackingDataAcceess,
    private readonly letterMediaDataAcceess: LetterMediaDataAcceess,
    private readonly usersSystemDataAcceess: UsersSystemDataAcceess,
    private readonly usersCompanyDataAcceess: UsersCompanyDataAcceess,
    private readonly companyDataAcceess: CompanyDataAcceess,
    private readonly mediaDataAcceess: MediaDataAcceess,
    private readonly letterNumberingDataAcceess: LetterNumberingDataAcceess,
  ) {}
  // CREATE LETTER ************************************
  async createLetter(
    createLetterDto: CreateLetterDto,
    userId: number,
  ): Promise<LetterDto> {
    const {
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
      LetterMedias,
    } = createLetterDto;
    // VARIABLES
    let reciverUser: number,
      reciverCompany: number = null;
    // CHECK TITLE
    if (!title) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'TITLE_IS_EMPTY',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // FIND SIGNER
    const signer = await this.usersSystemDataAcceess.findById(signerId);
    if (!signer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'SIGNER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK TYPE AND FIND RECIVER
    if (type === letterTypesEnum.internal.code) {
      // INTERNAL LETTER
      const userSystem = await this.usersSystemDataAcceess.findById(
        reciverUserId,
      );
      reciverCompany = null;
      reciverUser = userSystem.userId;
    } else if (type === letterTypesEnum.issued.code) {
      // ISSUED LETTER
      if (!reciverCompanyId) {
        const userCompany = await this.usersCompanyDataAcceess.findById(
          reciverUserId,
        );
        reciverCompany = userCompany.companyId;
        reciverUser = userCompany.userId;
      } else if (!reciverUserId) {
        const company = await this.companyDataAcceess.findById(
          reciverCompanyId,
        );
        reciverCompany = company.id;
        reciverUser = null;
      }
    }
    // CHECK TYPE
    const checkType = Object.keys(letterTypesEnum).some(
      (key) => letterTypesEnum[key].code === type,
    );
    if (!checkType) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'LETTER_TYPE_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK PRIORITY
    const checkPriority = Object.keys(letterPrioritiesEnum).some(
      (key) => letterPrioritiesEnum[key].code === priority,
    );
    if (!checkPriority) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'LETTER_PRIORITY_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK CONFIDENTIALITY
    const checkConfidentiality = Object.keys(letterConfidentialitiesEnum).some(
      (key) => letterConfidentialitiesEnum[key].code === confidentiality,
    );
    if (!checkConfidentiality) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'LETTER_CONFIDENTIALITY_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK ATTACH TYPE
    if (attachType !== null) {
      const checkAttachType = Object.keys(letterAttachTypesEnums).some(
        (key) => letterAttachTypesEnums[key].code === attachType,
      );
      if (!checkAttachType) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'LETTER_ATTACH_TYPE_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
    // CREATE LETTER
    const letter = await this.letterDataAcceess.createLetter(
      userId,
      title,
      content,
      signer.userId,
      reciverCompany,
      reciverUser,
      type,
      priority,
      confidentiality,
      attached,
      attachType,
    );
    // Create a tracking record for the new letter
    await this.letterTrackingDataAcceess.createTracking(
      null,
      letter.id,
      userId,
      reciverUser,
      letterTrackingTypes.reciver.code,
    );
    //  CREATE LETTER MEDIA
    if (
      typeof LetterMedias === 'object' &&
      LetterMedias.constructor === Array &&
      LetterMedias.length > 0
    ) {
      await bluebirdPromise.map(LetterMedias, async (media) => {
        const item = await this.mediaDataAcceess.findById(media.mediaId);
        if (item) {
          const letterMedia = await this.letterMediaDataAcceess.create(
            media.mediaId,
            letter.id,
            media.title,
          );
          this.mediaDataAcceess.updateMediaOwner(
            letterMedia.id,
            'LetterMedia',
            media.mediaId,
          );
        }
      });
    }
    return letterObj(letter);
  }
  // UPDATE LETTER ************************************
  async updateLetter(
    updateLetterDto: UpdateLetterDto,
    userId: number,
  ): Promise<boolean> {
    const {
      id,
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
      LetterMedias,
    } = updateLetterDto;
    // FIND LETTER
    const letter = await this.letterDataAcceess.findById(id);
    if (!letter) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'LETTER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK USER
    if (userId !== letter.signerId && userId !== letter.senderUserId) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'USER_NOT_ACCEPTABLE',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // CHECK SIGN LETTER
    if (letter.signatureStatus === letterSignatureStatusesEnum.signed.code) {
      await this.letterDataAcceess.changeStatus(
        id,
        letterStatusesEnums.registered.code,
      );
      await this.letterDataAcceess.unSignLetter(
        id,
        letterSignatureStatusesEnum.unsigned.code,
      );
    }
    // UPDATE LETTER
    const result = await this.letterDataAcceess.update(
      id,
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
    );
    //  CREATE LETTER MEDIA
    if (
      typeof LetterMedias === 'object' &&
      LetterMedias.constructor === Array &&
      LetterMedias.length > 0
    ) {
      await bluebirdPromise.map(LetterMedias, async (media) => {
        const item = await this.mediaDataAcceess.findById(media.mediaId);
        if (item) {
          const letterMedia = await this.letterMediaDataAcceess.create(
            media.mediaId,
            letter.id,
            media.title,
          );
          this.mediaDataAcceess.updateMediaOwner(
            letterMedia.id,
            'LetterMedia',
            media.mediaId,
          );
        }
      });
    }
    return true;
  }
  // SIGN LETTER **************************************
  async signLetter(
    signLetterDto: SignLetterDto,
    userId: number,
  ): Promise<LetterDto> {
    const { letterId } = signLetterDto;
    // CHECK LETTER
    const letter = await this.letterDataAcceess.findById(letterId);
    if (!letter) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'LETTER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK SIGNER
    if (letter.signerId !== userId) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'SIGNER_NOT_VALID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    // FIND SIGNER
    const signer = await this.usersSystemDataAcceess.findById(userId);
    if (!signer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'SIGNER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK LETTER STATUS
    if (letter.status !== letterStatusesEnums.registered.code) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'LETTER_STATUS_NOT_VALID',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // SIGN LETTER با مدیریت خطا
    try {
      await this.letterDataAcceess.signLetter(
        letterId,
        userId,
        signer.signatureMediaId,
      );
      return this.getDetail(letterId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'SIGNING_PROCESS_FAILED',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // NUMBERING LETTER **********************************
  async numberingLetter(
    numberingLetterDto: NumberingLetterDto,
    userId: number,
  ): Promise<LetterDto> {
    const { letterId } = numberingLetterDto;
    // CHECK LETTER
    const letter = await this.letterDataAcceess.findById(letterId);
    if (!letter) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'LETTER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // CHECK LETTER STATUS
    if (letter.status !== letterStatusesEnums.signed.code) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'نامه امضا نشده است',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // CHECK LETTER (INTERVAL OR ISSUE)
    if (letter.type === letterTypesEnum.internal.code) {
      // CHECK USER FOR NUMBERING
      if (letter.signerId !== userId) {
        throw new HttpException(
          {
            status: HttpStatus.METHOD_NOT_ALLOWED,
            error: 'شما دسترسی به شماره گذاری  نامه ندارید',
          },
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      }
      // FIND LETTER NUMBER SERIES
      const findLetterNumber = await this.letterNumberingDataAcceess.findByType(
        letterTypesEnum.internal.code,
      );
      // CREATE NUMBER FOR THIS LETTER
      const thisNumber =
        findLetterNumber && findLetterNumber.lastNumber !== null
          ? Number(findLetterNumber.lastNumber) +
            Number(findLetterNumber.growthNumber)
          : Number(findLetterNumber.startingNumber) +
            Number(findLetterNumber.growthNumber);
      // NUMBERING LETTER AND UPDATE LETTER
      await this.letterDataAcceess.numberingLetter(letterId, thisNumber);
      // UPDATE LAST NUMBER IN LETTER NUMBER
      await this.letterNumberingDataAcceess.updateLastNumber(
        findLetterNumber.id,
        thisNumber,
      );
    } else {
      const userSystem = await this.usersSystemDataAcceess.findByUserId(userId);
      if (userSystem.userType !== userTypesEnums.Secretariat.code) {
        throw new HttpException(
          {
            status: HttpStatus.METHOD_NOT_ALLOWED,
            error: 'شما دسترسی به شماره گذاری  نامه ندارید',
          },
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      }
      // FIND LETTER NUMBER SERIES
      const findLetterNumber = await this.letterNumberingDataAcceess.findByType(
        letterTypesEnum.issued.code,
      );
      // CREATE NUMBER FOR THIS LETTER
      const thisNumber = !findLetterNumber.lastNumber
        ? findLetterNumber.lastNumber + findLetterNumber.growthNumber
        : findLetterNumber.startingNumber + findLetterNumber.growthNumber;
      // NUMBERING LETTER AND UPDATE LETTER
      await this.letterDataAcceess.numberingLetter(letterId, thisNumber);
      // UPDATE LAST NUMBER IN LETTER NUMBER
      await this.letterNumberingDataAcceess.updateLastNumber(
        findLetterNumber.id,
        thisNumber,
      );
    }
    return this.getDetail(letterId);
  }
  // FIND LETTER ***************************************
  async getDetail(id: number): Promise<LetterDto> {
    // check letter
    const letter = await this.letterDataAcceess.getFullInfoLetter(id);
    if (!letter) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'LETTER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return letterObj(letter);
  }
  // LIST OF SEND LETTERS *****************************
  async getSendLetters(userId: number): Promise<LetterDto[]> {
    // get send letters
    const list = await this.letterDataAcceess.sendLetters(userId);
    return list.map((item) => letterObj(item));
  }
  // LIST OF RECEIVED LETTERS **************************
  async getRecivedLetters(userId): Promise<LetterTrackingDto[]> {
    // the recipient of the referral letter
    const recievedTracking = await this.letterDataAcceess.recivedTrackings(
      userId,
    );
    return recievedTracking.map((item) => letterTrackingObjDto(item));
  }
  // COUNT LIST OF RECEIVED LETTERS *********************
  async getCountRecivedLetters(userId: number): Promise<number> {
    const recievedTracking = await this.letterDataAcceess.recivedTrackings(
      userId,
    );
    const countOfNewLetters = recievedTracking.filter(
      (letterTrack) =>
        letterTrack.status === letterTrackingStatuses.unseen.code,
    );
    return countOfNewLetters.length;
  }
  // LIST OF DRAFT LETTERS ******************************
  async getDraftLetters(userId: number): Promise<LetterDto[]> {
    // get draft letters
    const draftList = await this.letterDataAcceess.draftLetters(userId);
    return draftList.map((item) => letterObj(item));
  }
  // LIST OF INTERNAL LETTERS *****************************
  async getInternalLetters(userId: number): Promise<LetterDto[]> {
    const internalList = await this.letterDataAcceess.internalLetters(userId);
    return internalList.map((item) => letterObj(item));
  }
  // LIST OF INTERNAL LETTERS *****************************
  async getIssuedLetters(userId: number): Promise<LetterDto[]> {
    const internalList = await this.letterDataAcceess.issuedLetters(userId);
    return internalList.map((item) => letterObj(item));
  }
}
