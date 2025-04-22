import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { LetterTracking } from './lettterTracking.model';
import { Media } from './media.model';

@Table({
  tableName: 'letter_tracking_medias',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class LetterTrackingMedia extends Model {
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

  // Foreign key to LetterTracking
  @ForeignKey(() => LetterTracking)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  letterTrackingId: number;

  @BelongsTo(() => LetterTracking, 'letterTrackingId')
  letterTracking: LetterTracking;

  // Foreign key to Media
  @ForeignKey(() => Media)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  mediaId: number;

  @BelongsTo(() => Media, 'mediaId')
  media: Media;

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
}
