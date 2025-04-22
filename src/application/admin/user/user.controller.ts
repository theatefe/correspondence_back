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
import { UserService } from './user.service';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  DeleteUserDto,
} from '../../../DTO/user.dto';

@ApiTags('admins user')
@Controller('admins/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // users create *****************************************************
  @ApiOperation({ summary: 'users create' })
  @ApiOkResponse({
    description: 'status',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'create new user',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async usersCreate(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.create(createUserDto);
      res.json(true);
      return true;
    } catch (err) {
      throw err;
    }
  }
  // users list *****************************************************
  @ApiOperation({ summary: 'users list' })
  @ApiOkResponse({
    description: 'users list',
    type: [UserDto],
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async usersList(): Promise<UserDto[]> {
    const list = await this.userService.usersList();
    return list;
  }

  // get user by id *******************************************
  @ApiOperation({ summary: 'get user by id' })
  @ApiOkResponse({
    description: 'user info',
    type: UserDto,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getUserInfo(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<UserDto> {
    const user = await this.userService.findById(id);
    return user;
  }
  // update user **************************************************
  @ApiOperation({ summary: 'update user' })
  @ApiOkResponse({
    description: 'user info',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'create new user',
  })
  @HttpCode(HttpStatus.OK)
  @Put('')
  async updateUserInfo(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Boolean> {
    const user = await this.userService.updateUserInfo(updateUserDto);
    return user;
  }
  // delete user **************************************************
  @ApiOperation({ summary: 'delete user' })
  @ApiOkResponse({
    description: 'Delete user status',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: DeleteUserDto,
    description: 'create new user',
  })
  @HttpCode(HttpStatus.OK)
  @Delete('')
  async DeleteUser(@Body() deleteUserDto: DeleteUserDto): Promise<Boolean> {
    await this.userService.deleteUser(deleteUserDto);
    return true;
  }
}
