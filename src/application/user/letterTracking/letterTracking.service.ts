import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bluebirdPromise = require('bluebird');
// DTO
import {
  CreateLetterTrackingDto,
  LetterTrackingDto,
  letterTrackingObjDto,
  SeenLetterTrackingDto,
} from '../../../DTO/letterTracking.dto';
// DATA ACCESS
import { LetterDataAcceess } from '../../../dataAccess/letter.dataAccess';
import { LetterTrackingDataAcceess } from '../../../dataAccess/letterTracking.dataAccess';
import { UsersSystemDataAcceess } from '../../../dataAccess/usersSystem.dataAccess';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import { LetterTrackingMediaDataAcceess } from '../../../dataAccess/letterTrackingMedia.dataAccess';
// ENUMS
import letterTrackingTypes from '../../../common/eNums/letterTrackingType.enum';

@Injectable()
export class LetterTrackingService {
  constructor(
    private readonly letterTrackingDataAcceess: LetterTrackingDataAcceess,
    private readonly letterDataAcceess: LetterDataAcceess,
    private readonly mediaDataAcceess: MediaDataAcceess,
    private readonly letterTrackingMediaDataAcceess: LetterTrackingMediaDataAcceess,
    private readonly usersSystemDataAcceess: UsersSystemDataAcceess,
  ) {}
  // CREATE LETTER TRACKING ***************************
  async createLetterTracking(
    createLetterTrackingDto: CreateLetterTrackingDto,
    userId: number,
  ): Promise<boolean> {
    try {
      const { description, letterId, toUserId, type, letterTrackingMedias } =
        createLetterTrackingDto;

      // بررسی وجود نامه
      const letter = await this.letterDataAcceess.findById(letterId);
      if (!letter) {
        throw new HttpException('LETTER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      // بررسی وجود کاربر دریافت‌کننده
      const receiver = await this.usersSystemDataAcceess.findByUserId(toUserId);
      if (!receiver) {
        throw new HttpException('RECEIVER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      // بررسی معتبر بودن نوع ردیابی
      const isValidType = Object.values(letterTrackingTypes).some(
        (item) => item.code === type,
      );
      if (!isValidType) {
        throw new HttpException(
          'TRACKING_TYPE_INVALID',
          HttpStatus.BAD_REQUEST,
        );
      }

      // ایجاد ردیابی
      const tracking = await this.letterTrackingDataAcceess.createTracking(
        description,
        letterId,
        userId,
        toUserId,
        type,
      );

      // ایجاد رسانه‌های ردیابی (اگر وجود داشته باشند)
      if (
        Array.isArray(letterTrackingMedias) &&
        letterTrackingMedias.length > 0
      ) {
        await Promise.all(
          letterTrackingMedias.map(async (media) => {
            const mediaItem = await this.mediaDataAcceess.findById(
              media.mediaId,
            );
            if (!mediaItem) {
              throw new HttpException(
                `MEDIA_NOT_FOUND: ${media.mediaId}`,
                HttpStatus.NOT_FOUND,
              );
            }

            const trackingMedia =
              await this.letterTrackingMediaDataAcceess.create(
                media.mediaId,
                tracking.id,
                media.title || 'untitled',
              );

            // منتظر انجام آپدیت مالک رسانه بمانید
            await this.mediaDataAcceess.updateMediaOwner(
              trackingMedia.id,
              'LetterTrackingMedia',
              media.mediaId,
            );
          }),
        );
      }

      return true;
    } catch (error) {
      // لاگ خطا برای دیباگ
      console.error('Error in createLetterTracking:', error);

      // اگر خطا از نوع HttpException نباشد، آن را به خطای سرور تبدیل کنید
      if (!(error instanceof HttpException)) {
        throw new HttpException(
          'INTERNAL_SERVER_ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw error;
    }
  }
  // SEEN LETTER TRACKING *******************************
  async seenLetterTracking(
    seenLetterTrackingDto: SeenLetterTrackingDto,
    userId: number,
  ): Promise<boolean> {
    const { id } = seenLetterTrackingDto;
    await this.letterTrackingDataAcceess.seenTracking(id, userId);
    // const updated = await this.letterTrackingDataAcceess.findById(id);
    return true;
  }
}
