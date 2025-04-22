import { Column, Table, Model, BelongsTo } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { User } from './user.model';

@Table({
  tableName: 'user_tokens',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class UserToken extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @Column({
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  })
  userId: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  device: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  ip: string;

  @Column({
    type: Sequelize.TEXT,
    allowNull: true,
  })
  jwtToken: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  secretKey: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  fireBaseToken: string;

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
  User: User;
}
