import { Column, Table, Model } from 'sequelize-typescript';
import Sequelize from 'sequelize';

@Table({
  tableName: 'medias',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Media extends Model {
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
  })
  mediaUrl: string;

  @Column({
    allowNull: true,
    type: Sequelize.INTEGER,
  })
  ownerId: number;

  @Column({
    allowNull: true,
    type: Sequelize.STRING,
  })
  ownerModel: string;

  @Column({
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  mimeType: number;

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
