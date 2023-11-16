// Import required modules and initialize router
const express = require("express");
const router = express.Router();

// Import database and path modules
const path = require("path");

const db = require("../src/db/db");


const template_path = path.join(__dirname, "views");

// Import employee collection model
const userCollections = require("../src/model/model");


// Render registration page
router.get("/registration", (req, res) => {
  res.render("registration");
});



// Handle regis form submission
router.post("/registration", async (req, res) => {
  try {
    // Check if username already exists
    const name = req.body.name;
    const getName = await userCollections.findOne({ name: name });
    if (getName) {
      const err = "Username is already taken!";
      res.send("Username is already in use");
    } else {
      // Check if passwords match
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      if (password === cpassword) {
        // Create new employee data document
        const empData = new userCollections({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          cpassword: req.body.cpassword,
        });
        // Save employee data to database
        const postData = await empData.save();
        console.log(`User Saved with Username: ${req.body.name} and password: ${req.body.password}`);

        res.render("login");
      } else {
        const error = "Invalid Credentials";
        res.render("registration", { error });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

// Export router for use in other files
module.exports = router;
