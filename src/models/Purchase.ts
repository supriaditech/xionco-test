import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Purchase extends Model {
  public id!: number;
  public ProductId!: number;
  public quantity!: number;
  public status!: "completed" | "cancelled";
  public totalPrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Purchase.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "completed" },
    totalPrice: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "Purchase", timestamps: true, paranoid: true }
);
