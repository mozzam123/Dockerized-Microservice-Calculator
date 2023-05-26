const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo_db:27017/userDB")
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((error) => {
    console.log(error);
  });
