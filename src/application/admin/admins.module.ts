import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AdminController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminsDataAcceess } from '../../dataAccess/admins.dataAccess';
// import modules
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { UserSystemModule } from './userSystem/userSystem.module';
import {UserCompanyModule} from './userCompany/userCompany.module';
import { LetterNumberingModule } from './letterNumbering/letterNumbering.module';
import { LetterNumberingPatternModule } from './letterNumberingPattern/letterNumberingPattern.module';
import {
  ValidAdminMiddleware,
  CheckAdminMiddleware,
} from '../../common/middlewares/validateAdmin.middleware';
import { Jwt } from '../../common/helpers/jwt.helper';
import { Tools } from '../../common/helpers/tools.helper';
import { ConvertDate } from '../../common/helpers/convertDate.helper';
@Module({
  imports: [
    UserModule,
    CompanyModule,
    UserSystemModule,
    UserCompanyModule,
    LetterNumberingModule,
    LetterNumberingPatternModule,
  ],
  controllers: [AdminController],
  providers: [AdminsService, AdminsDataAcceess, Jwt, Tools, ConvertDate],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidAdminMiddleware).forRoutes(
      'admins/user',
      'admins/company',
      'admins/userSystem',
      'admins/userCompany',
      'admins/letterNumbering',
      'admins/letterNumberingPattern',
      {
        path: 'admins',
        method: RequestMethod.GET,
      },
      {
        path: 'admins/updatePassword',
        method: RequestMethod.PUT,
      },
    );
    consumer.apply(CheckAdminMiddleware).forRoutes(
      {
        path: 'admins',
        method: RequestMethod.POST,
      },
      {
        path: 'admins/logOut',
        method: RequestMethod.GET,
      },
      {
        path: 'admins/forgetPass',
        method: RequestMethod.PUT,
      },
      {
        path: 'admins/recoverPass',
        method: RequestMethod.PATCH,
      },
    );
  }
}
