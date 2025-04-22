import {
  Column,
  Table,
  Model,
  BelongsTo,
  HasMany,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Letter } from './letter.model';
import { User } from './user.model';
import { LetterTrackingMedia } from './letterTrackingMedia.model';

@Table({
  tableName: 'letter_trackings',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class LetterTracking extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  // Foreign key to Letter
  @ForeignKey(() => Letter)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  letterId: number;

  @BelongsTo(() => Letter, { foreignKey: 'letterId' })
  letter: Letter;

  // Sender User
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fromUserId: number;
  @BelongsTo(() => User, { foreignKey: 'fromUserId' })
  fromUser: User;

  // reciver user
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  toUserId: number;
  @BelongsTo(() => User, { foreignKey: 'toUserId' })
  toUser: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  type: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  seenAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    defaultValue: () => new Date(),
  })
  createdAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    defaultValue: () => new Date(),
  })
  updatedAt: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  deletedAt: Date;

  @HasMany(() => LetterTrackingMedia, { foreignKey: 'letterTrackingId' })
  letterTrackingMedias: LetterTrackingMedia[];
}
