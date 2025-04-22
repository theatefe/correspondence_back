import { Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyDataAcceess } from './../../../dataAccess/company.dataAcces';
import { UsersCompanyDataAcceess } from '../../../dataAccess/usersCompany.dataAccess';
@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyDataAcceess, UsersCompanyDataAcceess],
})
export class CompanyModule {}
