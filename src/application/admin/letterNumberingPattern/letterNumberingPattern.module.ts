import { Module } from '@nestjs/common';

import { LetterNumberingPatternController } from './letterNumberingPattern.controller';
import { LetterNumberingPatternService } from './letterNumberingPattern.service';
// DATA ACCESS
import { LetterNumberingDataAcceess } from '../../../dataAccess/letterNumbering.dataAccess';
import { LetterNumberingPatternDataAcceess } from '../../../dataAccess/letterNumberingPattern.dataAccess';

@Module({
  imports: [],
  controllers: [LetterNumberingPatternController],
  providers: [
    LetterNumberingPatternService,
    LetterNumberingDataAcceess,
    LetterNumberingPatternDataAcceess,
  ],
})
export class LetterNumberingPatternModule {}
