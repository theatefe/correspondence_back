import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import Sequelize from 'sequelize';

// model
import { Admin } from './admin.model';

@Table({
  tableName: 'letters_numbering',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class LetterNumbering extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @ForeignKey(() => Admin)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
    references: { model: 'admins', key: 'id' },
  })
  adminId: number;

  @BelongsTo(() => Admin, {
    foreignKey: 'adminId',
    as: 'admin',
  })
  admin: Admin;

  @ForeignKey(() => Admin)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
    references: { model: 'admins', key: 'id' },
  })
  updaterId: number;

  @BelongsTo(() => Admin, {
    foreignKey: 'updaterId',
    as: 'updater',
  })
  updater: Admin;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
  })
  startingNumber: number;

  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
  })
  growthNumber: number;

  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
  })
  lastNumber: number;

  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
  })
  type: number;

  @Column({
    allowNull: true,
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  })
  active: true;

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
}
