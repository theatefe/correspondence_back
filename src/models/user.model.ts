import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import Sequelize from 'sequelize';
// MODEL
import { UserToken } from './userToken.model';
// ENUM
import userStatuses from '../common/eNums/userStatus.enum';
import genderEnum from './../common/eNums/gender.enum ';
import martialStatusEnum from './../common/eNums/martialStatus.enum';

@Table({
  tableName: 'users',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  respectfulTitle: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  fatherName: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  nationalCode: string;

  @Column({
    type: Sequelize.DATE,
    allowNull: true,
  })
  dateOfBirth: Date;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  })
  mobile: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  education: string;

  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: genderEnum.notSelected.code,
  })
  gender: number;

  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: martialStatusEnum.notSelected.code,
  })
  maritalStatus: number;

  @Column({
    type: Sequelize.BOOLEAN,
    defaultValue: userStatuses.active.code, // enum
  })
  activeStatus: boolean;

  @Column({
    type: Sequelize.TEXT,
    allowNull: true,
  })
  deActiveReason: string;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  createdAt: Date;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  updatedAt: Date;

  @Column({
    allowNull: true,
    type: Sequelize.DATE,
  })
  deletedAt: Date;

  @HasMany(() => UserToken, { foreignKey: 'userId' })
  UserTokens: UserToken[];
}
