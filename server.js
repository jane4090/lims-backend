const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔗 MongoDB Connection (Cloud for Render, Local for dev)
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/lims";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔐 Auth Routes (register/login)
app.use("/api/auth", require("./routes/auth"));

// 📬 General Request Routes (citizen request submission)
app.use("/api/requests", require("./routes/requests"));

// ✳️ Optional test endpoints
app.post("/api/registration", (req, res) => {
  console.log("📨 Registration Received:", req.body);
  res.json({ message: "Registration submitted successfully!" });
});

app.post("/api/valuation", (req, res) => {
  console.log("📨 Valuation Request Received:", req.body);
  res.json({ message: "Valuation request received!" });
});

// 🚀 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 LIMS backend running at http://localhost:${PORT}`);
});
