import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../models";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    // Total Produk
    const totalProducts = await db.Product.count();

    // Total Transaksi
    const totalTransactions = await db.Purchase.count({
      where: { status: "completed" },
    });

    // Total Pendapatan
    const revenueData = await db.Purchase.sum("totalPrice", {
      where: { status: "completed" },
    });
    const totalRevenue = revenueData || 0;

    // Cek Stok Menipis
    const lowStockCount = await db.Stock.count({
      where: { quantity: { [Op.lt]: 10 } },
    });

    // Transaksi Terakhir
    const recentPurchases = await db.Purchase.findAll({
      include: [{ model: db.Product }],
      order: [["createdAt", "DESC"]],
      limit: 5,
      where: { status: "completed" },
    });

    res.render("index", {
      totalProducts,
      totalTransactions,
      totalRevenue,
      lowStockCount,
      recentPurchases,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).send("Error loading dashboard");
  }
};
