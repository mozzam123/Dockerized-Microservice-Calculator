// Import required packages
require("dotenv").config()
const app = require("./app")
const connectDB = require("./db/db");


// Set port number
const PORT = process.env.PORT | 2222;

// Call the connectDB function to establish the MongoDB connection
connectDB;


// Start listening for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});