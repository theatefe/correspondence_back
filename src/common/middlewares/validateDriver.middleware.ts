import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Jwt } from '../helpers/jwt.helper';
import { UsersDataAcceess } from '../../dataAccess/users.dataAccess';
import { userObj } from '../../DTO/user.dto';

@Injectable()
export class ValidDriverMiddleware implements NestMiddleware {
  constructor(
    private readonly usersDataAcceess: UsersDataAcceess,
    private readonly jwt: Jwt,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // if (req.session.driver && req.session.driver.isDriver) {
    //   res.locals.driver = req.session.driver;
    //   next();
    // } else
    if (req.header('jtoken') && req.header('jtoken').length > 0) {
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
      const activeToken = await this.usersDataAcceess.findUserToken(token);
      if (!activeToken) {
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
      } else {
        const driver = userObj(activeToken.User, token);
        // req.session.driver = driver;
        res.locals.driver = driver;
        next();
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
