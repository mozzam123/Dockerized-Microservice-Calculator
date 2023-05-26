// Import required packages
const express = require("express");
const path = require("path");

// Create Express app instance
const app = express();

// Set port number
const port = 9000;

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
app.set("views", path.join(__dirname, "views"));

// Register routes
app.use(proposalRoute);


// Start listening for requests on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });