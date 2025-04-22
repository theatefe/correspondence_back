import { Column, Table, Model, BelongsTo } from 'sequelize-typescript';
import Sequelize from 'sequelize';

import { Role } from './role.model';

@Table({
  tableName: 'permissions',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Permission extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
    references: { model: 'roles', key: 'id' },
  })
  roleId: number;


  @Column({
    allowNull: false,
    type: Sequelize.BOOLEAN,
  })
  access: boolean;

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


  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  Role: Role;
}
