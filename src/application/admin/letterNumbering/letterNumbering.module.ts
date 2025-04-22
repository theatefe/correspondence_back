import { Module } from '@nestjs/common';

import { LetterNumberingController } from './letterNumbering.controller';
import { LetterNumberingService } from './letterNumbering.service';
// DATA ACCESS
import {LetterNumberingDataAcceess} from '../../../dataAccess/letterNumbering.dataAccess';

@Module({
  imports: [],
  controllers: [LetterNumberingController],
  providers: [
    LetterNumberingService,
    LetterNumberingDataAcceess,
  ],
})
export class LetterNumberingModule {}
