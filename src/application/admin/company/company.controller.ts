import {
  Controller,
  HttpStatus,
  HttpCode,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  DeleteCompanyDto,
  CompanyDto,
} from '../../../DTO/company.dto';

@ApiTags('admins company')
@Controller('admins/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  // list *****************************************************
  @ApiOperation({ summary: 'companies list' })
  @ApiOkResponse({
    description: 'companies list',
    type: [CompanyDto],
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async list(): Promise<CompanyDto[]> {
    const list = await this.companyService.list();
    return list;
  }
  // companies create *****************************************************
  @ApiOperation({ summary: 'create new company' })
  @ApiOkResponse({
    description: 'companies list',
    type: CompanyDto,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: CreateCompanyDto,
    description: 'create new company',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyDto> {
    try {
      const company = await this.companyService.create(createCompanyDto);
      return company;
    } catch (err) {
      throw err;
    }
  }
  // update company *****************************************************
  @ApiOperation({ summary: 'update company' })
  @ApiOkResponse({
    description: 'companies list',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: UpdateCompanyDto,
    description: 'update company',
  })
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<boolean> {
    try {
     await this.companyService.update(updateCompanyDto);
     return true;
    } catch (err) {
      throw err;
    }
  }
  // get compamy by id *******************************************
  @ApiOperation({ summary: 'get compamy by id' })
  @ApiOkResponse({
    description: 'compamy info',
    type: CompanyDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:compamyId')
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  async getUserMidInf(
    @Param(
      'compamyId',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    compamyId: number,
  ): Promise<CompanyDto> {
    const user = await this.companyService.findOne(compamyId);
    return user;
  }
  // delete company *****************************************************
  @ApiOperation({ summary: 'delete company' })
  @ApiOkResponse({
    description: 'delete company status',
    type: Boolean,
  })
  @ApiHeader({
    name: 'jtoken',
    description: 'this token recieved in login',
  })
  @ApiBody({
    type: DeleteCompanyDto,
    description: 'delete company',
  })
  @Delete('')
  @HttpCode(HttpStatus.OK)
  async delete(@Body() deleteCompanyDto: DeleteCompanyDto): Promise<boolean> {
    try {
      await this.companyService.delete(deleteCompanyDto);
      return true;
    } catch (err) {
      throw err;
    }
  }
}
