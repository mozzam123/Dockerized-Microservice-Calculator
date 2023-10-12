const mongoose = require("mongoose");
const DB = process.env.DATABASE
mongoose.connect(DB)
  .then(() => {
    console.log("Mongo Connected for User Service");
  })
  .catch((error) => {
    console.log(error);
  });
