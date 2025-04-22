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
import { Media } from './media.model';
// ENUM
import UserType from '../common/eNums/userType.enum';

@Table({
  tableName: 'user_systems',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class UserSystem extends Model {
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

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: Sequelize.INTEGER,
    defaultValue: UserType.Employe.code, // enum
  })
  userType: number;

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
    type: Sequelize.INTEGER,
    allowNull: true,
    references: { model: 'medias', key: 'id' },
  })
  signatureMediaId: number;

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

  @BelongsTo(() => Media, { foreignKey: 'signatureMediaId' })
  Media: Media;
}
