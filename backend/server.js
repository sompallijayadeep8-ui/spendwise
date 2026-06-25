const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionroute"));
app.get("/", (req, res) => {
  res.send("SpendWise API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const protect = require("./middleware/auth");

app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    userId: req.userId
  });
});