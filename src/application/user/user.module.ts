import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import provider
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LetterModule } from './letter/letter.module';
import { LetterTrackingModule } from './letterTracking/letterTracking.module';
// import dataaccess
import { UsersDataAcceess } from '../../dataAccess/users.dataAccess';
import { MediaDataAcceess } from '../../dataAccess/media.dataAccess';
import { UsersSystemDataAcceess } from '../../dataAccess/usersSystem.dataAccess';

import {
  ValidAllUserMiddleware,
  ValidUserMiddleware,
} from '../../common/middlewares/validateUser.middleware';
import { Jwt } from '../../common/helpers/jwt.helper';
import { Tools } from '../../common/helpers/tools.helper';
import { ConvertDate } from '../../common/helpers/convertDate.helper';

@Module({
  imports: [
    LetterModule,
    LetterTrackingModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UsersDataAcceess,
    MediaDataAcceess,
    UsersSystemDataAcceess,
    Jwt,
    Tools,
    ConvertDate,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidUserMiddleware)
      .forRoutes('user/userinf', 'user/letter', 'user/letterTracking');
    consumer
      .apply(ValidAllUserMiddleware)
      .forRoutes('user/update', 'user/avatarMedia',{
        path: 'user',
        method: RequestMethod.GET,
      });
  }
}
