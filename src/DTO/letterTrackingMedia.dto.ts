import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { mediaObj, MediaDto } from './media.dto';

// OBJ *******************

export function letterTrackingMediaObj(trackingMedia) {
  return {
    id: trackingMedia.id,
    title: trackingMedia.title,
    letterTrackingId: trackingMedia.letterTrackingId,
    mediaId: trackingMedia.mediaId,
    mediaObj: mediaObj(trackingMedia.media),
  };
}

// CLASS *******************

export class LetterTrackingMediaDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  letterTrackingId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  mediaId: number;

  @ApiProperty({
    type: MediaDto,
  })
  mediaObj: MediaDto;
}

export class CreateLetterTrackingMediaDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  mediaId: number;

  @ApiProperty({ type: String })
  title: string;
}

export class DeleteLetterTrackingMediaDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  letterTrackingId: number;
}
