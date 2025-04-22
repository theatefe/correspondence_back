import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import Sequelize from 'sequelize';
// model
import { Admin } from './admin.model';
import {LetterNumbering} from './lettterNumbering.model';

@Table({
  tableName: 'letters_numbering_pattern',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class LetterNumberingPattern extends Model {
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

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  title: string;

  @ForeignKey(() => LetterNumbering)
  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
    references: { model: 'letters_numbering', key: 'id' },
  })
  numberingId: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  pattern: string;

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
  active: boolean;

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

  @BelongsTo(() => LetterNumbering, { foreignKey: 'numberingId' })
  LetterNumbering: LetterNumbering;
}
