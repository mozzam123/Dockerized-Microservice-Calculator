const express = require("express");
require("dotenv").config();
const INV_PORT = process.env.INV_PORT;
const app = express();
const path = require("path");

// Define template path
const template_path = path.join(__dirname, "views");

// Import routes
const mutualFundRoutes = require("./routes/mutualFunds");

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Set view engine and template path
app.set("view engine", "hbs");
app.set("views", template_path);

// Register Routes
app.use(mutualFundRoutes);

app.listen(INV_PORT, () => {
  console.log(`Server running on http://127.0.0.1:${INV_PORT}`);
});
