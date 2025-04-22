import * as Models from '../models/index';
import letterTrackingStatuses from '../common/eNums/letterTrackingStatus.enum';
export class LetterTrackingDataAcceess {
  // create tracking
  async createTracking(
    description: string,
    letterId: number,
    fromUserId: number,
    toUserId: number,
    type: number,
  ) {
    const tracking = await Models.LetterTracking.create({
      letterId,
      title: description,
      fromUserId,
      toUserId,
      type,
      status: letterTrackingStatuses.unseen.code,
    });
    return tracking;
  }

  async seenTracking(id: number, userId: number) {
    return await Models.LetterTracking.update(
      {
        status: letterTrackingStatuses.seen.code,
        seenAt: new Date(),
      },
      {
        where: {
          id,
          toUserId: userId,
        },
      },
    );
  }

  // async findById(id: number) {
  //   const result = await Models.LetterTracking.findByPk(id);
  //   return result;
  // }
}
