import { Column, Table, Model, BelongsTo, HasMany } from 'sequelize-typescript';
import Sequelize from 'sequelize';

import { Role } from './role.model';
import { Media } from './media.model';

@Table({
  tableName: 'admins',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Admin extends Model {
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
    unique: true,
  })
  username: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  })
  mobile: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  password: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  lastName: string;

  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
    references: { model: 'medias', key: 'id' },
  })
  avatarMediaId: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: Sequelize.TEXT,
    allowNull: true,
  })
  jwtToken: string;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  activeStatus: number;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
    defaultValue: 0,
    references: { model: 'roles', key: 'id' },
  })
  roleId: number;

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

  @BelongsTo(() => Media, { foreignKey: 'avatarMediaId' })
  Media: Media;

}
