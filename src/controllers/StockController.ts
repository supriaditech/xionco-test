import { Request, Response } from "express";
import db from "../models";

export const getStock = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows: products } = await db.Product.findAndCountAll({
      include: [{ model: db.Stock }],
      order: [["name", "ASC"]],
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.render("stock", {
      products,
      currentPage: page,
      totalPages,
      totalItems: count,
    });
  } catch (error) {
    console.error("Error get stock:", error);
    res.status(500).send("Error");
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const stock = await db.Stock.findOne({ where: { ProductId: productId } });

    if (stock) {
      stock.quantity = parseInt(quantity);
      await stock.save();
    }

    res.redirect("/stock");
  } catch (error) {
    console.error("Error update stock:", error);
    res.status(500).send("Gagal update stok");
  }
};
