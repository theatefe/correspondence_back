import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { User } from './user.model';

@Table({
  tableName: 'companies',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Company extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    comment: 'توضیحات',
  })
  description: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    comment: 'ایمیل',
  })
  email: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    comment: 'شماره تماس',
  })
  phoneNumber: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    comment: 'آدرس',
  })
  address: string;

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

  @HasMany(() => User, { foreignKey: 'companyId' })
  Users: User[];
}
