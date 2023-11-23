// Import required packages
const express = require("express");
const path = require("path");
require("dotenv").config()

// Create Express app instance
const app = express();

// Set port number
const PROP_PORT = process.env.PROP_PORT | 3333;

// Define template path
const template_path = path.join(__dirname, "views");

// Import routes
const proposalRoute = require("./routes/proposal");

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Parse request bodies
app.use(express.urlencoded({ extended: false }));

// Set view engine and template path
app.set("view engine", "hbs");
app.set("views", template_path);
// app.set("views", path.join(__dirname, "views"));

// Register routes
app.use(proposalRoute);


// Start listening for requests on the specified port
app.listen(PROP_PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PROP_PORT}`);
});