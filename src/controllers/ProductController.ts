import { Request, Response } from "express";
import db from "../models";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Product.findAndCountAll({
      include: [{ model: db.Stock }],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.render("product", {
      products: rows,
      currentPage: page,
      totalPages: totalPages,
      totalItems: count,
    });
  } catch (error) {
    console.error("Error create product:", error);
    res.status(500).send("Gagal membuat produk");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, initialStock } = req.body;

    const newProduct = await db.Product.create({
      name: name,
      price: parseInt(price),
    });

    await db.Stock.create({
      ProductId: newProduct.id,
      quantity: parseInt(initialStock),
    });

    res.redirect("/product");
  } catch (error) {
    console.error("Error create product:", error);
    res.status(500).send("Gagal membuat produk");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    await db.Product.update(
      { name, price: parseInt(price) },
      { where: { id } }
    );

    res.redirect("/product");
  } catch (error) {
    console.error("Error update:", error);
    res.status(500).send("Gagal update");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.Product.destroy({ where: { id } });

    res.redirect("/product");
  } catch (error) {
    console.error("Error delete:", error);
    res.status(500).send("Gagal hapus");
  }
};
