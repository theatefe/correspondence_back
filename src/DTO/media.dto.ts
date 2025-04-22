import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import pathes from '../config/pathes';

// OBJ *******************

export function mediaObj(media) {
  return {
    id: media.id,
    mediaUrl: `${pathes.siteUrl}${media.mediaUrl}`,
    ownerId: media.ownerId,
    mimeType: media.mimeType,
  };
}

// CLASS *******************

export class MediaDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  mediaUrl: string;

  @ApiProperty({ type: Number })
  ownerId: number;

  @ApiProperty({ type: String })
  mimeType: string;
}
