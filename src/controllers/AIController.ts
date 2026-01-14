import { Request, Response } from "express";
import OpenAI from "openai";
import db from "../models";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const products = await db.Product.findAll({
      include: [{ model: db.Stock }],
    });
    const transactions = await db.Purchase.findAll({
      where: { status: "completed" },
    });

    const productInfo = products
      .map(
        (p) =>
          `- ${p.name}: Harga Rp${p.price.toLocaleString()}, Stok ${
            p.Stock?.quantity || 0
          } unit`
      )
      .join("\n");

    const totalOmzet = transactions.reduce((sum, tr) => sum + tr.totalPrice, 0);
    const totalQtySold = transactions.reduce((sum, tr) => sum + tr.quantity, 0);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Anda adalah Manager Toko Digital. Berikut data asli toko:
          
          DAFTAR PRODUK & STOK:
          ${productInfo}

          RINGKASAN PENJUALAN:
          - Total Omzet: Rp${totalOmzet.toLocaleString()}
          - Total Barang Terjual: ${totalQtySold} unit

          TUGAS ANDA:
          - Jawab pertanyaan admin berdasarkan data di atas.
          - Jika ditanya "Berapa total transaksi/omzet", jawab Rp${totalOmzet.toLocaleString()}.
          - Gunakan format Markdown (Tabel/List) agar rapi.
          - Selalu gunakan mata uang Rupiah (Rp).
          - Jika admin menanyakan keuntungan atau daftar barang, WAJIB gunakan format TABEL MARKDOWN.
          - Gunakan kolom: No, Nama Produk, Terjual, Margin/Unit, dan Subtotal Profit.
          - Gunakan tebal (**) pada total akhir agar menonjol.
          -Jika ada stok yang tidak laku, beri saran singkat di bawah tabel.
          - Jika menampilkan daftar, gunakan format Tabel Markdown atau Bullet Points.
          - Gunakan simbol Rp untuk harga.
          - Jangan pernah menjawab dalam satu paragraf panjang jika datanya banyak.`,
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memproses pesan" });
  }
};
