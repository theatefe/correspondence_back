import * as Models from '../models/index';

export class MediaDataAcceess {
  async findById(id) {
    const media = await Models.Media.findByPk(id);
    return media;
  }
  async createMedia(mediaUrl, mimeType) {
    const media = await Models.Media.create({
      mediaUrl,
      mimeType,
      ownerId: 0,
      ownerModel: '',
    });

    return media;
  }
  async updateMediaOwner(ownerId, ownerModel, id) {
    await Models.Media.update(
      {
        ownerId,
        ownerModel,
        updatedAt: new Date(),
      },
      {
        where: {
          id,
        },
      },
    );
  }
  async deleteMedia(id) {
    await Models.Media.destroy({
      where: { id },
    });
    return;
  }
}
