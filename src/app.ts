import express from "express";
import path from "path";
import router from "./routes";
import db from "./models";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

const startServer = async () => {
  try {
    // await db.sequelize.sync({ force: true });
    await db.sequelize.sync({ alter: false });
    console.log("✅ Database synced!");

    // JALANKAN SERVER
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Gagal koneksi database:", error);
  }
};

startServer();
