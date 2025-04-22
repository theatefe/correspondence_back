import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
// MODEL
import { User } from './user.model';
import { Company } from './company.model';
// ENUM
import UserType from '../common/eNums/userType.enum';

@Table({
  tableName: 'user_companies',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class UserCompany extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
    references: { model: 'users', key: 'id' },
  })
  userId: number;

  @ForeignKey(() => Company)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
    references: { model: 'companies', key: 'id' },
  })
  companyId: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  side: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  respectfulSide: string;

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

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;

  @BelongsTo(() => Company, { foreignKey: 'companyId' })
  company: Company;
}
