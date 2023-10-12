// Import required packages
require("dotenv").config()
const app = require("./app")
const connectDB = require("./db/db");


// Set port number
const PORT = process.env.PORT | 8888;

// Call the connectDB function to establish the MongoDB connection
connectDB;


// Start listening for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});