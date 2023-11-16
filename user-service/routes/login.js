// Import required modules and libraries
const express = require("express");
const router = express.Router();
// const redis = require("redis");
const path = require("path");
const { Kafka, Partitioners } = require("kafkajs");
const PROP_PORT = process.env.PROP_PORT

// Create Kafka producer instance
const kafka = new Kafka({ brokers: ["localhost:9092"] });
const producer = kafka.producer();


// Set up template path for views
const template_path = path.join(__dirname, "views");

// const client = redis.createClient({
//   url: 'redis://redis:6379'
//   });
// client.connect();


// client.on("connect", () => {
//   console.log("Redis connected");
// });

// client.on("error", (err) => {
//   console.error('*******error*****: ',err);
// });

// Set up database connection and model
require("../src/db/db");
 

const userCollections = require("../src/model/model");


// Handle GET request for root URL
router.get("/", (req, res) => {
  res.render("login");
});



// Handle POST request for root URL
router.post('/login', async (req, res) => {
  try {
    const loginName = req.body.name;
    const loginPassword = req.body.loginpassword;
    const getName = await userCollections.findOne({ name: loginName });
    const getPassword = await userCollections.findOne({password: loginPassword,});

    if (getName && getPassword) {
      // // Set Data to Redis
      // client.SETEX(loginName, 3600, loginPassword);
      // console.log(`Saved in Redis with key: ${loginName}`);

      // Create message to be sent to Kafka topic
      const message = {
        username: loginName,
        loggedIn: true,
      };
      console.log('Created Message');

      // Send message to Kafka topic
      await producer.connect();
      console.log('Producer connected');
      await producer.send({
        topic: 'user-credentials',
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log(`Sent message to Kafka topic 'user-credentials': ${JSON.stringify(message)}`);
      await producer.disconnect();
      console.log('Disconnected Producer');

      res.redirect(`http://127.0.0.1:${PROP_PORT}/proposal`);
      console.log('Redirected');

    } else {
      const error = 'Invalid Credentials';
      res.render('login', { error });
    }
  } catch (error) {
    res.send(error);
  }
});


// Export router module for use in application
module.exports = router;