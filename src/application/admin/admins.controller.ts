import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Req,
  Res,
  Get,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AdminsService } from './admins.service';
import {
  AdminDto,
  AdminLoginDto,
  adminObj,
  AdminUpdatePasswordDto,
} from '../../DTO/admin.dto';
@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminsService: AdminsService) {}
  // login ************************************
  @ApiOkResponse({
    description: 'admin login successful',
    type: [AdminDto],
  })
  @ApiNotFoundResponse({ description: 'admin not found' })
  @ApiInternalServerErrorResponse({
    description: 'login faild',
  })
  @Post('')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Body() login: AdminLoginDto,
  ): Promise<AdminDto> {
    try {
      if (req.session && req.session.admin) {
        return req.session.admin;
      }
      const admin = await this.adminsService.login(
        login.username,
        login.password,
      );
      req.session.admin = admin;
      return admin;
    } catch (err) {
      throw err;
    }
  }
  // logOut Admin ********************************************************
  @ApiOkResponse({
    description: 'logOut',
    type: Boolean,
  })
  @ApiNotFoundResponse({ description: 'admin not found' })
  @ApiInternalServerErrorResponse({
    description: 'logout faild',
  })
  @HttpCode(HttpStatus.OK)
  @Get('logOut')
  async logOut(@Req() req: Request, @Res() res: Response): Promise<boolean> {
    try {
      const { admin } = res.locals;
      if (admin) {
        await this.adminsService.logOut(admin.id);
      }
      req.session.destroy((e) => console.log(e));
      res.json(true);
      return;
    } catch (err) {
      throw err;
    }
  }
  // dashboard ************************************
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async dash(@Res() res: Response): Promise<AdminDto> {
    if (res.locals.admin) {
      res.json(adminObj(res.locals.admin));
      return;
    }
  }
  // updatePassword ************************************
  @ApiOkResponse({
    description: 'update password',
    type: Boolean,
  })
  @ApiBody({
    type: AdminUpdatePasswordDto,
    description: 'update admin password',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Put('updatePassword')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Res() res: Response,
    @Body() updatePasswordDto: AdminUpdatePasswordDto,
  ) {
    try {
      const { admin } = res.locals;
      await this.adminsService.updatePassword(
        updatePasswordDto.oldPassword,
        updatePasswordDto.newPassword,
        admin.username,
      );
      res.json(true);
      return;
    } catch (err) {
      throw err;
    }
  }
}
