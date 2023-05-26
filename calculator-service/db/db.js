const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo_db:27017/user_calculations")
  .then(() => {
    console.log("Mongo Connected for Caclulator Service");
  })
  .catch((error) => {
    console.log(error);
  });
