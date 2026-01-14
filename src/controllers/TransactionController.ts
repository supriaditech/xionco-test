import { Request, Response } from "express";
import db from "../models";

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Purchase.findAndCountAll({
      include: [{ model: db.Product }],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    const products = await db.Product.findAll({
      include: [{ model: db.Stock }],
      order: [["name", "ASC"]],
    });

    const totalPages = Math.ceil(count / limit);

    res.render("transaction", {
      transactions: rows,
      products,
      currentPage: page,
      totalPages: totalPages,
      totalItems: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

export const buyProduct = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const qty = parseInt(quantity);

    const product = await db.Product.findOne({
      where: { id: productId },
      include: [{ model: db.Stock }],
    });

    if (!product) {
      return res.status(404).send("Produk tidak ditemukan");
    }

    if (!product.Stock || product.Stock.quantity < qty) {
      return res.send(`
        <script>
          alert("Gagal! Stok tidak mencukupi.");
          window.location.href = "/transaction";
        </script>
      `);
    }

    await product.Stock.update({
      quantity: product.Stock.quantity - qty,
    });

    await db.Purchase.create({
      ProductId: productId,
      quantity: qty,
      totalPrice: product.price * qty,
      status: "completed",
    });

    res.redirect("/transaction");
  } catch (error) {
    console.error("Error buy product:", error);
    res.status(500).send("Gagal memproses pembelian");
  }
};

export const cancelPurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transactionId = parseInt(id as string);
    const transaction = await db.Purchase.findByPk(transactionId);

    if (!transaction || transaction.status === "cancelled") {
      return res.redirect("/transaction");
    }

    const stock = await db.Stock.findOne({
      where: { ProductId: transaction.ProductId },
    });

    if (stock) {
      await stock.update({
        quantity: stock.quantity + transaction.quantity,
      });
    }

    transaction.status = "cancelled";
    await transaction.save();

    res.redirect("/transaction");
  } catch (error) {
    console.error("Error cancel purchase:", error);
    res.status(500).send("Gagal membatalkan transaksi");
  }
};
