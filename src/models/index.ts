import { Product } from "./Product";
import { Stock } from "./Stock";
import { Purchase } from "./Purchase";
import sequelize from "../config/database";

Product.hasOne(Stock, {
  foreignKey: "ProductId",
  onDelete: "CASCADE",
});
Stock.belongsTo(Product, {
  foreignKey: "ProductId",
  onDelete: "CASCADE",
});

Product.hasMany(Purchase, {
  foreignKey: "ProductId",
  onDelete: "CASCADE",
});
Purchase.belongsTo(Product, {
  foreignKey: "ProductId",
  onDelete: "CASCADE",
});

const db = {
  sequelize,
  Product,
  Stock,
  Purchase,
};

export default db;
