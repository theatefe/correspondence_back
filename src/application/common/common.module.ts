import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { AdminsDataAcceess } from '../../dataAccess/admins.dataAccess';
import { MediaDataAcceess } from '../../dataAccess/media.dataAccess';

import { Jwt } from '../../common/helpers/jwt.helper';
import { Tools } from '../../common/helpers/tools.helper';
import { ConvertDate } from '../../common/helpers/convertDate.helper';

import { ValidAdminMiddleware } from '../../common/middlewares/validateAdmin.middleware';
@Module({
  imports: [],
  controllers: [CommonController],
  providers: [
    CommonService,
    AdminsDataAcceess,
    MediaDataAcceess,
    Jwt,
    Tools,
    ConvertDate,
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidAdminMiddleware).forRoutes({
      path: 'commons/updateCityLocation',
      method: RequestMethod.PUT,
    });
  }
}
