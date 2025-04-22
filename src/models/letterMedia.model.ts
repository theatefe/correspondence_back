import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Letter } from './letter.model';
import { Media } from './media.model';

@Table({
  tableName: 'letter_medias',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class LetterMedia extends Model {
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

  @BelongsTo(() => Letter, 'letterId')
  letter: Letter;

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
