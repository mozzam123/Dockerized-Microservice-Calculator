const express = require("express");
require("dotenv").config();
const INV_PORT = process.env.INV_PORT;

const app = express();
app.get("/", (req, res) => {
  res.send("mozzam Inamdar");
});

app.listen(INV_PORT, () => {
  console.log(`Server running on http://127.0.0.1:${INV_PORT}`);
});
