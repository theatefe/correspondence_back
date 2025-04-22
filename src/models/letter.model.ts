import {
  Column,
  Table,
  Model,
  BelongsTo,
  HasMany,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Media } from './media.model';
import { User } from './user.model';
import { LetterMedia } from './letterMedia.model';
import { LetterTracking } from './lettterTracking.model';
import { Company } from './company.model';
// Enums
import letterSignatureStatusesEnums from '../common/enums/letterSignatureStatus.enum';
import letterStatusesEnums from '../common/enums/letterStatus.enum';

@Table({
  tableName: 'letters',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Letter extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  number: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  title: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  content: string;

  // Sender User
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  senderUserId: number;

  @BelongsTo(() => User, 'senderUserId')
  senderUser: User;

  // Sender Company
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  senderCompanyId: number;

  @BelongsTo(() => Company, 'senderCompanyId')
  senderCompany: Company;

  // Signer
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  signerId: number;

  @BelongsTo(() => User, 'signerId')
  signer: User;

  // Receiver User
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  receiverUserId: number;

  @BelongsTo(() => User, 'receiverUserId')
  receiverUser: User;

  // Receiver Company
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  receiverCompanyId: number;

  @BelongsTo(() => Company, 'receiverCompanyId')
  receiverCompany: Company;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  priority: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  confidentiality: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: letterSignatureStatusesEnums.unsigned.code,
  })
  signatureStatus: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: letterStatusesEnums.registered.code,
  })
  status: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  attached: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  attachType: number;

  // Signature Media
  @ForeignKey(() => Media)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  signatureId: number;

  @BelongsTo(() => Media, 'signatureId')
  signature: Media;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  signedAt: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  numberedAt: Date;

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

  @HasMany(() => LetterMedia, { foreignKey: 'letterId' })
  letterMedias: LetterMedia[];

  @HasMany(() => LetterTracking, { foreignKey: 'letterId' })
  letterTrackings: LetterTracking[];
}
