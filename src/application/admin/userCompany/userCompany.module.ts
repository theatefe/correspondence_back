import { Module } from '@nestjs/common';
// CONTROLLER
import { UserCompanyController } from './userCompany.controller';
// SERVICE
import { UserCompanyService } from './userCompany.service';
//DATA ACCESSES
import {UsersCompanyDataAcceess} from '../../../dataAccess/usersCompany.dataAccess';
import { CompanyDataAcceess} from '../../../dataAccess/company.dataAcces';
import { UsersDataAcceess } from '../../../dataAccess/users.dataAccess';
import { MediaDataAcceess } from '../../../dataAccess/media.dataAccess';
import { Tools } from '../../../common/helpers/tools.helper';

@Module({
  controllers: [UserCompanyController],
  providers: [
    UserCompanyService,
    UsersCompanyDataAcceess,
    CompanyDataAcceess,
    UsersDataAcceess,
    MediaDataAcceess,
    Tools,
  ],
})
export class UserCompanyModule {}
