import db from "../models";

const ProductSeeder = async () => {
  try {
    console.log("Sedang menghubungkan ke database...");

    await db.sequelize.sync({ alter: false });

    await db.Purchase.destroy({ where: {}, truncate: false });
    await db.Stock.destroy({ where: {}, truncate: false });
    await db.Product.destroy({ where: {}, truncate: false });

    const products = [
      { name: "Kopi Susu Gula Aren", price: 18000, stock: 50 },
      { name: "Americano Panas", price: 15000, stock: 20 },
      { name: "Cappuccino", price: 22000, stock: 35 },
      { name: "Roti Bakar Coklat", price: 12000, stock: 10 },
      { name: "Kentang Goreng", price: 15000, stock: 100 },
      { name: "Es Teh Manis", price: 5000, stock: 200 },
      { name: "Mie Goreng Spesial", price: 20000, stock: 15 },
      { name: "Nasi Goreng Kampung", price: 25000, stock: 25 },
      { name: "Air Mineral", price: 4000, stock: 500 },
      { name: "Matcha Latte", price: 24000, stock: 40 },
    ];

    for (const p of products) {
      const newProduct = await db.Product.create({
        name: p.name,
        price: p.price,
      });

      await db.Stock.create({
        ProductId: newProduct.id,
        quantity: p.stock,
      });
    }

    console.log("Berhasil!");
    process.exit(0);
  } catch (error) {
    console.error("Gagal seeding database:", error);
    process.exit(1);
  }
};

ProductSeeder();
