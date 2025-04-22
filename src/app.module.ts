import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AdminModule } from './application/admin/admins.module';
import { UserModule } from './application/user/user.module';
import { CommonModule } from './application/common/common.module';
import { UsersDataAcceess } from './dataAccess/users.dataAccess';
import { ScheduleModule } from '@nestjs/schedule';

import { Jwt } from './common/helpers/jwt.helper';
import 'dotenv/config';
import sequilzeObj from './database/sequilze.obj';
import * as path from 'path';

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
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        pool: true,
        port: 25,
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@exirpouyan.com>',
      },
      template: {
        dir: path.resolve() + '/mailtemplate',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
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
