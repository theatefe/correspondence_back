import { Module } from '@nestjs/common';

import { UserSystemController } from './userSystem.controller';
import { UserSystemService } from './userSystem.service';
//DATA ACCESSES
import {UsersSystemDataAcceess} from '../../../dataAccess/usersSystem.dataAccess';
import { UsersDataAcceess } from '../../../dataAccess/users.dataAccess';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import { Tools } from '../../../common/helpers/tools.helper';

@Module({
  controllers: [UserSystemController],
  providers: [
    UserSystemService,
    UsersSystemDataAcceess,
    UsersDataAcceess,
    MediaDataAcceess,
    Tools,
  ],
})
export class UserSystemModule {}
