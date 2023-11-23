const express = require("express");
require("dotenv").config();
const INV_PORT = process.env.INV_PORT;
const app = express();
const path = require("path");

// Define template path
const template_path = path.join(__dirname, "views");

// Set view engine and template path
app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(INV_PORT, () => {
  console.log(`Server running on http://127.0.0.1:${INV_PORT}`);
});
