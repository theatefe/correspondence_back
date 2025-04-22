import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';

import { Tools } from '../../common/helpers/tools.helper';
import { MediaDataAcceess } from '../../dataAccess/media.dataAccess';

import pathes from '../../config/pathes';
import * as fs from 'fs';
import { mediaObj } from '../../DTO/media.dto';

@Injectable()
export class CommonService {
  constructor(
    private readonly mediaDataAcceess: MediaDataAcceess,
    private readonly tools: Tools,
  ) {}
  // uploadfile ***************************************************
  async upload(filename, dist) {
    !fs.existsSync(`${pathes.staticFiles}${pathes.uploadedFiles}${dist}`)
      ? fs.mkdir(
          `${pathes.staticFiles}${pathes.uploadedFiles}${dist}`,
          (err) => {
            console.log(err);
          },
        )
      : null;
    fs.copyFile(
      `${pathes.staticFiles}${pathes.uploadedFiles}${filename}`,
      `${pathes.staticFiles}${pathes.uploadedFiles}${dist}/${filename}`,
      (err) => {
        if (err) console.log(err);
        fs.unlinkSync(
          `${pathes.staticFiles}${pathes.uploadedFiles}${filename}`,
        );
      },
    );
    const mimeType = await this.tools.checkMime(
      `${pathes.staticFiles}${pathes.uploadedFiles}/${dist}/${filename}`,
    );
    const mediaUrl = `${pathes.uploadedFiles}${dist}`;
    const file = await this.mediaDataAcceess.createMedia(mediaUrl, mimeType);
    return mediaObj(file);
  }
  async uploadWithCompress(filename, dist) {
    !fs.existsSync(`${pathes.staticFiles}${pathes.uploadedFiles}${dist}`)
      ? fs.mkdir(
          `${pathes.staticFiles}${pathes.uploadedFiles}${dist}`,
          (err) => {
            console.log(err);
          },
        )
      : null;
    const mimeType = await this.tools.checkMime(
      `${pathes.staticFiles}${pathes.uploadedFiles}${filename}`,
    );
    if (mimeType === 1) {
      await shell.exec(
        'sudo  ffmpeg -i   ' +
          `${pathes.staticFiles}${pathes.uploadedFiles}${filename}` +
          ' -vf scale=w=720:h=380:force_original_aspect_ratio=decrease ' +
          `${pathes.staticFiles}${pathes.uploadedFiles}${dist}/${filename}` +
          '  2>&1',
      );
      fs.unlinkSync(`${pathes.staticFiles}${pathes.uploadedFiles}${filename}`);
    } else if (mimeType === 2) {
      await shell.exec(
        'sudo  ffmpeg -i   ' +
          `${pathes.staticFiles}${pathes.uploadedFiles}${filename}` +
          '  -vf scale=480:-1  ' +
          `${pathes.staticFiles}${pathes.uploadedFiles}${dist}/${filename}` +
          '  2>&1',
      );
      fs.unlinkSync(`${pathes.staticFiles}${pathes.uploadedFiles}${filename}`);
    } else {
      fs.copyFile(
        `${pathes.staticFiles}${pathes.uploadedFiles}${filename}`,
        `${pathes.staticFiles}${pathes.uploadedFiles}${dist}/${filename}`,
        (err) => {
          if (err) console.log(err);
          fs.unlinkSync(
            `${pathes.staticFiles}${pathes.uploadedFiles}${filename}`,
          );
        },
      );
    }
    const mediaUrl = `${pathes.uploadedFiles}${dist}/${filename}`;
    const file = await this.mediaDataAcceess.createMedia(mediaUrl, mimeType);
    return mediaObj(file);
  }
  async deleteMedia(mediaId) {
    const media = await this.mediaDataAcceess.findById(mediaId);
    if (media && media.ownerId === 0) {
      const fileUrl = `${pathes.staticFiles}/${media.mediaUrl}`;
      try {
        fs.unlinkSync(fileUrl);
        await this.mediaDataAcceess.deleteMedia(mediaId);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return false;
  }
}
