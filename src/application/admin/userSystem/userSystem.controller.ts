import {
  Controller,
  HttpStatus,
  HttpCode,
  Get,
  Post,
  Body,
  Res,
  Param,
  ParseIntPipe,
  Put,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
// SERVICE
import { UserSystemService } from './userSystem.service';
// DTO
import {
  UserSystemDto,
  CreateUserSystemDto,
  UpdateUserSystemDto,
  AdminChangePasswordDto,
} from '../../../DTO/userSystem.dto';

@ApiTags('admins user system')
@Controller('admins/userSystem')
export class UserSystemController {
  constructor(private readonly userSystemService: UserSystemService) {}
  // user system create *****************************************************
  @ApiOperation({ summary: 'user system create' })
  @ApiOkResponse({
    description: 'status',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: CreateUserSystemDto,
    description: 'create new user',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async usersCreate(
    @Body() createUserSystemDto: CreateUserSystemDto,
    @Res() res: Response,
  ) {
    try {
      await this.userSystemService.create(createUserSystemDto);
      res.json(true);
      return true;
    } catch (err) {
      throw err;
    }
  }
  // users system list *****************************************************
  @ApiOperation({ summary: 'users system list' })
  @ApiOkResponse({
    description: 'users system list',
    type: [UserSystemDto],
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async usersList(): Promise<UserSystemDto[]> {
    const list = await this.userSystemService.list();
    return list;
  }
  
  // get user system by id *******************************************
  @ApiOperation({ summary: 'get user system by id' })
  @ApiOkResponse({
    description: 'user system info',
    type: UserSystemDto,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getUserMidInf(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<UserSystemDto> {
    const userSystem = await this.userSystemService.findById(id);
    return userSystem;
  }
  // update user system **************************************************
  @ApiOperation({summary:'update user system info'})
  @ApiOkResponse({
    description: 'user system info',
    type: Boolean,
  })
  @ApiBody({
    type: UpdateUserSystemDto,
    description: 'create new user',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @HttpCode(HttpStatus.OK)
  @Put('')
  async updateUserInfo(
    @Body() updateUserSystemDto: UpdateUserSystemDto,
  ): Promise<boolean> {
     await this.userSystemService.updateUserInfo(updateUserSystemDto);
    return true;
  }
  // update password ******************************************
  @ApiOperation({ summary: 'update user system password' })
  @ApiOkResponse({
    description: 'status',
    type: Boolean,
  })
  @ApiBody({
    type: AdminChangePasswordDto,
    description: 'Admin Change Password Dto',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Res() res: Response,
    @Body() adminChangePasswordDto: AdminChangePasswordDto,
  ): Promise<boolean> {
    try {
      const result = await this.userSystemService.updatePassword(
        adminChangePasswordDto,
      );
      res.json(result);
      return;
    } catch (err) {
      throw err;
    }
  }
}
