const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");



const dotenv = require("dotenv");
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());



const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:");
    console.error(err.message || err);
  });


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

