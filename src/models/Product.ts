import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { Stock } from "./Stock";

export class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public Stock?: Stock;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);
