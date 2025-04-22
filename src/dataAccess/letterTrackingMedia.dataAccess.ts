import * as Models from '../models/index';

export class LetterTrackingMediaDataAcceess {
  // create
  async create(
    mediaId: number,
    letterTrackingId: number,
    title: string,
  ) {
    const trackingMedia = await Models.LetterTrackingMedia.create({
      mediaId,
      letterTrackingId,
      title,
    })
    return trackingMedia;
  }
}
