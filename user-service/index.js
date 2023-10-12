// Import required packages
const express = require("express");
const path = require("path");
require("dotenv").config()

// Create Express app instance
const app = express();


// Set port number
const PORT = process.env.PORT | 8000;

// Import and connect to database
require("./src/db/db");

// Define template path
const template_path = path.join(__dirname, "views");

// Import employee model
const userCollectionsns = require("./src/model/model");

// Import routes
const loginRoutes = require("./routes/login");
const regisRoutes = require("./routes/registration");

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Parse request bodies
app.use(express.urlencoded({ extended: false }));

// Set view engine and template path
app.set("view engine", "hbs");
app.set("views", template_path);
app.set("views", path.join(__dirname, "views"));

// Register routes
app.use(loginRoutes);
app.use(regisRoutes);

// Start listening for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});