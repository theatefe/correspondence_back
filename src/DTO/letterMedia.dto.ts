import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { mediaObj, MediaDto } from './media.dto';

// OBJ *******************

export function LetterMediaObj(media) {
  return {
    id: media.id,
    title: media.title,
    mediaId: media.mediaId,
    letterId:media.letterId,
    mediaObj: mediaObj(media.Media),
  };
}

// CLASS *******************

export class LetterMediaDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  letterId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  mediaId: number;

  @ApiProperty({
    type: MediaDto,
  })
  mediaObj: MediaDto;
}

export class CreateLetterMediaDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  mediaId: number;

  @ApiProperty({ type: String })
  title: string;
}

export class DeleteDocumentMediaDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  letterId: number;
}
