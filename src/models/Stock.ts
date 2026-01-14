import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Stock extends Model {
  public id!: number;
  public ProductId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Stock.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, modelName: "Stock", timestamps: true, paranoid: true }
);
