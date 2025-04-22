import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersDataAcceess } from '../../../dataAccess/users.dataAccess';
import { UsersSystemDataAcceess } from '../../../dataAccess/usersSystem.dataAccess';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import { Tools } from '../../../common/helpers/tools.helper';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UsersDataAcceess,
    UsersSystemDataAcceess,
    MediaDataAcceess,
    Tools,
  ],
})
export class UserModule {}
