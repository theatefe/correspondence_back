import { Module } from '@nestjs/common';

import { LetterTrackingController } from './letterTracking.controller';
import { LetterTrackingService } from './letterTracking.service';
// DATA ACCESS
import { LetterDataAcceess } from '../../../dataAccess/letter.dataAccess';
import { LetterTrackingDataAcceess } from '../../../dataAccess/letterTracking.dataAccess';
import { UsersSystemDataAcceess } from '../../../dataAccess/usersSystem.dataAccess';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import { LetterTrackingMediaDataAcceess } from '../../../dataAccess/letterTrackingMedia.dataAccess';

@Module({
  imports: [],
  controllers: [LetterTrackingController],
  providers: [
    LetterTrackingService,
    LetterDataAcceess,
    LetterTrackingDataAcceess,
    UsersSystemDataAcceess,
    MediaDataAcceess,
    LetterTrackingMediaDataAcceess,
  ],
})
export class LetterTrackingModule {}
