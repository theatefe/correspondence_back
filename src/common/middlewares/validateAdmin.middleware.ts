import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Jwt } from '../helpers/jwt.helper';
import { AdminsDataAcceess } from '../../dataAccess/admins.dataAccess';
import { adminObj } from '../../DTO/admin.dto';

@Injectable()
export class ValidAdminMiddleware implements NestMiddleware {
  constructor(
    private readonly adminsDataAcceess: AdminsDataAcceess,
    private readonly jwt: Jwt,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // res.locals.admin = {
    //   id: 1,
    // };
    // next();
    // return;
    if (req.session.admin) {
      res.locals.admin = req.session.admin;
      next();
      return;
    } else if (req.header('jtoken') && req.header('jtoken').length > 0) {
      const token = req.header('jtoken');
      const tokenValues = this.jwt.verifier(token);

      if (!tokenValues) {
        next(
          new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: ' توکن نامعتبر ',
            },
            HttpStatus.FORBIDDEN,
          ),
        );
        return;
      }
      const admin = await this.adminsDataAcceess.findById(
        tokenValues['adminId'],
      );

      if (!admin) {
        next(
          new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: ' برای دسترسی باید وارد شوید ',
            },
            HttpStatus.FORBIDDEN,
          ),
        );
        return;
      }
      if (admin.jwtToken === token) {
        req.session.admin = admin;
        res.locals.admin = admin;
        next();
        return;
      } else {
        next(
          new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: ' برای دسترسی باید وارد شوید ',
            },
            HttpStatus.FORBIDDEN,
          ),
        );
        return;
      }
    } else {
      next(
        new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: ' برای دسترسی باید وارد شوید ',
          },
          HttpStatus.FORBIDDEN,
        ),
      );
      return;
    }
  }
}
@Injectable()
export class CheckAdminMiddleware implements NestMiddleware {
  constructor(
    private readonly adminsDataAcceess: AdminsDataAcceess,
    private readonly jwt: Jwt,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.session.admin) {
      res.locals.admin = req.session.admin;
      next();
    } else if (req.header('jtoken') && req.header('jtoken').length > 0) {
      const token = req.header('jtoken');
      const tokenValues = this.jwt.verifier(token);
      if (!tokenValues || !tokenValues['adminId']) {
        next();
      }
      const admin = await this.adminsDataAcceess.findById(
        tokenValues['adminId'],
      );
      if (!admin) {
        next();
      }
      if (admin.jwtToken === token) {
        const adminObject = adminObj(admin);
        req.session.admin = adminObject;
        res.locals.admin = adminObject;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  }
}
