import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/ProductController";
import { getDashboard } from "../controllers/DashboardController";
import { getStock, updateStock } from "../controllers/StockController";
import {
  buyProduct,
  cancelPurchase,
  getTransaction,
} from "../controllers/TransactionController";
import { askAI } from "../controllers/AIController";

const router = Router();

// Dashboard
router.get("/", getDashboard);

// Product
router.get("/product", getProduct);
router.post("/product/create", createProduct);
router.post("/product/update/:id", updateProduct);
router.post("/product/delete/:id", deleteProduct);

// Stock
router.get("/stock", getStock);
router.post("/stock/update", updateStock);

// Transaction
router.get("/transaction", getTransaction);
router.post("/transaction/buy", buyProduct);
router.post("/transaction/cancel/:id", cancelPurchase);

// AI
router.get("/chat", (req, res) => res.render("chat"));
router.post("/ai/ask", askAI);

export default router;
