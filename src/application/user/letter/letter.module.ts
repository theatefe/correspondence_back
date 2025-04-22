import { Module } from '@nestjs/common';

import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';
// DATA ACCESS
import { LetterDataAcceess } from '../../../dataAccess/letter.dataAccess';
import { LetterTrackingDataAcceess } from '../../../dataAccess/letterTracking.dataAccess';
import { LetterMediaDataAcceess } from '../../../dataAccess/letterMedia.dataAccess';
import { UsersSystemDataAcceess } from '../../../dataAccess/usersSystem.dataAccess';
import { UsersCompanyDataAcceess } from '../../../dataAccess/usersCompany.dataAccess';
import { CompanyDataAcceess } from '../../../dataAccess/company.dataAcces';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import { LetterNumberingPatternDataAcceess } from '../../../dataAccess/letterNumberingPattern.dataAccess';
import { LetterNumberingDataAcceess } from '../../../dataAccess/letterNumbering.dataAccess';

@Module({
  imports: [],
  controllers: [LetterController],
  providers: [
    LetterService,
    CompanyDataAcceess,
    LetterDataAcceess,
    LetterTrackingDataAcceess,
    LetterMediaDataAcceess,
    UsersSystemDataAcceess,
    UsersCompanyDataAcceess,
    LetterNumberingPatternDataAcceess,
    LetterNumberingDataAcceess,
    MediaDataAcceess,
  ],
})
export class LetterModule {}
