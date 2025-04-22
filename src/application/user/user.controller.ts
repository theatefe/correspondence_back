import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Req,
  Res,
  Get,
  // UsePipes,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserService } from './user.service';
// import { MobilePipe } from '../../pipes/mobile.pipe';
import { IpAddress } from '../../decorators/ipaddress.decorator';
// import { CodePipe } from '../../pipes/code.pipe';
import { UserSystemDto, UserSystemLoginDto } from '../../DTO/userSystem.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // LOGOUT ***********************************
  @ApiOperation({ summary: 'logOut user system' })
  @ApiOkResponse({
    description: 'logOut',
    type: Boolean,
  })
  @ApiNotFoundResponse({ description: 'user system not found' })
  @ApiInternalServerErrorResponse({
    description: 'logout faild',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in signIn',
  })
  @HttpCode(HttpStatus.OK)
  @Get('signOut')
  async signOut(
    @Headers() headers,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<boolean> {
    try {
      const { jtoken } = headers;
      if (jtoken) {
        await this.userService.signOut(jtoken);
      }
      req.session.destroy((e) => console.log(e));
      res.json(true);
      return;
    } catch (err) {
      throw err;
    }
  }
  // LANDING **************************************
  @ApiOperation({ summary: 'user system dashboard' })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiNotFoundResponse({ description: 'user system not found' })
  @ApiInternalServerErrorResponse({
    description: 'landing faild',
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  async dash(@Res() res: Response) {
    res.json(res.locals.user);
    return;
  }
  // LOGIN ******************************************
  @ApiOkResponse({
    description: 'user system login successful',
    type: [UserSystemDto],
  })
  @ApiOperation({ summary: 'Login registered user system' })
  @ApiNotFoundResponse({ description: 'user system not found' })
  @ApiInternalServerErrorResponse({
    description: 'user faild',
  })
  // @UsePipes(new CodePipe(), new MobilePipe())
  @Post('')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @IpAddress() ip: string,
    @Body() userSystemLoginDto: UserSystemLoginDto,
  ): Promise<UserSystemDto> {
    try {
      const user = await this.userService.login(userSystemLoginDto, ip);
      req.session.user = user;
      res.json(user);
      return;
    } catch (err) {
      throw err;
    }
  }
  // GET FULL INFO  **********************************
  @ApiOperation({ summary: 'get fueprofile - login required' })
  @ApiOkResponse({
    description: 'get full info',
    type: UserSystemDto,
  })
  @ApiNotFoundResponse({ description: 'user system not found' })
  @ApiInternalServerErrorResponse({
    description: 'get info faild',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get('userInf')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Res() res: Response): Promise<UserSystemDto> {
    try {
      const userFullInfo = await this.userService.getProfile(
        res.locals.user.id,
      );
      res.json(userFullInfo);
      return;
    } catch (err) {
      throw err;
    }
  }
  // get usersystems list  **********************************
  @ApiOperation({ summary: 'get user system list' })
  @ApiOkResponse({
    description: 'get list',
    type: [UserSystemDto],
  })
  @ApiNotFoundResponse({ description: 'user system not found' })
  @ApiInternalServerErrorResponse({
    description: 'get list faild',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get('getList')
  @HttpCode(HttpStatus.OK)
  async getlist(@Res() res: Response): Promise<UserSystemDto[]> {
    try {
      const list = await this.userService.getList();
      res.status(200).json(list);
      return;
    } catch (err) {
      throw err;
    }
  }
}
