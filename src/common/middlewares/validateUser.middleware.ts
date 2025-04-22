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
export class ValidUserMiddleware implements NestMiddleware {
  constructor(
    private readonly usersDataAcceess: UsersDataAcceess,
    private readonly jwt: Jwt,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // if (req.session.user && req.session.user.isOwner) {
    //   res.locals.user = req.session.user;
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
        const user = userObj(activeToken.User, token);
        // req.session.user = user;
        res.locals.user = user;
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
@Injectable()
export class ValidAllUserMiddleware implements NestMiddleware {
  constructor(
    private readonly usersDataAcceess: UsersDataAcceess,
    private readonly jwt: Jwt,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // res.locals.user = {
    //   id: 14,
    // };
    // next();
    // return;
    // if (req.session.user) {
    //   res.locals.user = req.session.user;
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
        const user = userObj(activeToken.User, token);
        // req.session.user = user;
        res.locals.user = user;
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
@Injectable()
export class ValidateHeaderMiddleware implements NestMiddleware {
  constructor(private readonly jwt: Jwt) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // if (req.session.user) {
    //   res.locals.user = req.session.user;
    //   next();
    //   return;
    // } else
    if (req.header('jtoken') && req.header('jtoken').length > 0) {
      const token = req.header('jtoken');
      const tokenValues = this.jwt.verifier(token);
      if (!tokenValues) {
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
