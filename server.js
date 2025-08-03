const express = require("express");
const bodyParser = require("body-parser");
const ngrok = require("@ngrok/ngrok"); // install dulu via dependencies

const app = express();
const PORT = 25095;

// Middleware
app.use(bodyParser.json());

// Coba route test
app.get("/", (req, res) => {
  res.send("Server jalan bro 🔥");
});

// Route Midtrans (nanti bisa kamu sesuaikan)
app.post("/create-transaction", (req, res) => {
  const { amount, payment_type } = req.body;
  // logika midtrans disini
  res.json({ message: "Transaksi diproses", amount, payment_type });
});

// Start server & ngrok
app.listen(PORT, async () => {
  console.log(`✅ Server aktif di http://localhost:${PORT}`);

  try {
    const tunnel = await ngrok.connect({
      addr: PORT,
      authtoken_from_env: true // atau bisa langsung authtoken: "xxx"
    });
    console.log(`🌐 Ngrok aktif di: ${tunnel.url}`);
  } catch (err) {
    console.error("❌ Gagal menjalankan Ngrok:", err.message);
  }
});
