const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔗 MongoDB Connection
mongoose.connect("mongodb://localhost:27017/lims", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔐 Auth Routes (register/login)
app.use("/api/auth", require("./routes/auth"));

// 📬 General Request Routes (citizen request submission)
app.use("/api/requests", require("./routes/requests"));

// ✳️ Existing test endpoints (optional, keep if needed)
app.post("/api/registration", (req, res) => {
  console.log("📨 Registration Received:", req.body);
  res.json({ message: "Registration submitted successfully!" });
});

app.post("/api/valuation", (req, res) => {
  console.log("📨 Valuation Request Received:", req.body);
  res.json({ message: "Valuation request received!" });
});

// 🚀 Server Start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 LIMS backend running at http://localhost:${PORT}`);
});
