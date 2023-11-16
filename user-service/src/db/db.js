const mongoose = require("mongoose");
const DB = process.env.DATABASE

mongoose.connect("mongodb+srv://mozzam:mozzam@latestcluster.wdjuvrc.mongodb.net/Calculator_Microservice")
  .then(() => {
    console.log("Mongo Connected for Caclulator Service");
  })
  .catch((error) => {
    console.log(error);
  });
