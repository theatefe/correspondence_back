import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import Sequelize from 'sequelize';

import { Admin } from './admin.model';
import { Permission } from './permission.model';

@Table({
  tableName: 'roles',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Role extends Model {
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
  title: string;

  @Column({
    allowNull: true,
    type: Sequelize.TEXT,
  })
  description: string;

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

  @HasMany(() => Admin, { foreignKey: 'roleId' })
  Admins: Admin[];

  @HasMany(() => Permission, { foreignKey: 'roleId' })
  Permissions: Permission[];
}
