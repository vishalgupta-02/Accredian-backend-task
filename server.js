const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const referralRoutes = require("./src/routes/referralRoutes.js");
const { errorHandler } = require("./src/middlewares/errorHandler.js");
const { connectDB } = require("./src/configs/db.js");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://accredian-frontend-task-one-brown.vercel.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/referrals", referralRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
