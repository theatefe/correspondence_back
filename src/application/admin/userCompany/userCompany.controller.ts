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
  Delete,
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
import { UserCompanyService } from './userCompany.service';
// DTO
import {
  UserCompanyDto,
  CreateUserCompanyDto,
  UpdateUserCompanyDto,
  DeleteUserCompanyDto,
} from '../../../DTO/userCompany.dto';

@ApiTags('admins user company')
@Controller('admins/userCompany')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}
  // user company create *****************************************************
  @ApiOperation({ summary: 'user company create' })
  @ApiOkResponse({
    description: 'user Company dto result',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: CreateUserCompanyDto,
    description: 'create new user',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async usersCreate(
    @Body() createUserCompanyDto: CreateUserCompanyDto,
    @Res() res: Response,
  ) {
    try {
      await this.userCompanyService.create(createUserCompanyDto);
      res.status(200).json(true);
      return;
    } catch (err) {
      throw err;
    }
  }
  // users company list *****************************************************
  @ApiOperation({ summary: 'users company list' })
  @ApiOkResponse({
    description: 'users company list',
    type: [UserCompanyDto],
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async usersList(): Promise<UserCompanyDto[]> {
    const list = await this.userCompanyService.list();
    return list;
  }

  // get user company by id *******************************************
  @ApiOperation({ summary: 'get user company by id' })
  @ApiOkResponse({
    description: 'user company info',
    type: UserCompanyDto,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getUserCompanyInf(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<UserCompanyDto> {
    const userCompany = await this.userCompanyService.findById(id);
    return userCompany;
  }
  // update user company **************************************************
  @ApiOperation({ summary: 'update user company info' })
  @ApiOkResponse({
    description: 'user system info',
    type: Boolean,
  })
  @ApiBody({
    type: UpdateUserCompanyDto,
    description: 'create new user',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @HttpCode(HttpStatus.OK)
  @Put('')
  async updateUserInfo(
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ): Promise<boolean> {
    await this.userCompanyService.updateUserCompanyInfo(updateUserCompanyDto);
    return true;
  }
  // delete user company ******************************************
  @ApiOperation({ summary: 'delete user company' })
  @ApiOkResponse({
    description: 'status',
    type: Boolean,
  })
  @ApiBody({
    type: DeleteUserCompanyDto,
    description: 'Admin delete userCompany Dto',
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteUserCompany(
    @Body() deleteUserCompanyDto: DeleteUserCompanyDto,
  ): Promise<boolean> {
    try {
      await this.userCompanyService.deleteUserCompany(deleteUserCompanyDto);
      return true;
    } catch (err) {
      throw err;
    }
  }
}
