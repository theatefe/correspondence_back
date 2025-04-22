import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './application/admin/admins.module';
import { UserModule } from './application/user/user.module';
import { CommonModule } from './application/common/common.module';
import { UsersDataAcceess } from './dataAccess/users.dataAccess';
import { ScheduleModule } from '@nestjs/schedule';

import { Jwt } from './common/helpers/jwt.helper';
import 'dotenv/config';
import sequilzeObj from './database/sequilze.obj';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    sequilzeObj,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ScheduleModule.forRoot(),
    AdminModule,
    CommonModule,
    UserModule,
  ],
  controllers: [],
  providers: [UsersDataAcceess, Jwt],
})
export class AppModule {}
