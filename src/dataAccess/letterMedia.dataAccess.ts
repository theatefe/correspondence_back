import * as Models from '../models/index';

export class LetterMediaDataAcceess {
  // create
  async create(
    mediaId: number,
    letterId: number,
    title: string,
  ) {
    const letterMedia = await Models.LetterMedia.create({
      mediaId,
      letterId,
      title,
    })
    return letterMedia;
  }
}
