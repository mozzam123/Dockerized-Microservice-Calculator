const express = require("express");
const router = express.Router();
const session = require("express-session");
const { Kafka } = require("kafkajs");
const USER_PORT = process.env.USER_PORT
const PROP_PORT = process.env.PROP_PORT
const Calculation = require("../model/model");

// Define a variable to store the username
let newUser;

// Set up the session middleware
router.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

function generateNumericId(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a Kafka consumer
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Update with your Kafka broker's address
});
const consumer = kafka.consumer({ groupId: "my-group" });

// Subscribe to the 'user-credentials' topic
async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-credentials" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Assuming the username is stored as a string in the message value
      const messageValue = JSON.parse(message.value.toString());
      const { username } = messageValue;
      console.log("Received username:", username);

      newUser = username;
    },
  });
}

runConsumer().catch((error) => {
  console.error("Error running Kafka consumer:", error);
});

// Calculator Page
router.get("/calc", async (req, res) => {
  const calculationId = req.query.calculationId
  const calculationData = await Calculation.findOne({ calculationId: calculationId })

  res.render("calc", { calculationData: calculationData });
});


// Calculator Page
router.get("/", (req, res) => {
  res.redirect(`http://127.0.0.1:${USER_PORT}/`);
});



// POST Calculator Page
router.post("/calc", async (req, res) => {
  const interest = parseFloat(req.body.interest.replace(/[^0-9.-]+/g, ""));
  const principalAmt = parseFloat(req.body.P_amount.replace(/[^0-9.-]+/g, ""));
  const totalAmt = parseFloat(req.body.total.replace(/[^0-9.-]+/g, ""));
  console.log("Inside post Username:", newUser);

  let userId = req.session.userId;
  if (!userId) {
    userId = generateNumericId(6);
    req.session.userId = userId;
  }
  const calculationId = generateNumericId(6);

  // Find the latest calculation
  const latestCalculation = await Calculation.findOne({}, {}, { sort: { createdAt: -1 } });

  // Update the remarks field of the latest calculation
  if (latestCalculation) {
    latestCalculation.remarks = '';
    await latestCalculation.save();
  }

  const remarks = latestCalculation ? 'last generated id' : '';

  const calculation = new Calculation({
    username: newUser,
    userId: userId,
    calculationId: calculationId,
    interest: interest,
    principalAmt: principalAmt,
    totalAmt: totalAmt,
    remarks: remarks, // Set the remarks field based on the condition
  });
  console.log('Mapped value with database value');

  try {
    const savedCalculation = await calculation.save();
    console.log("Calculation saved successfully:", savedCalculation);
  } catch (error) {
    console.error("Error saving calculation:", error);
  }

  res.redirect(`http://127.0.0.1:${PROP_PORT}/proposal`);
});

module.exports = router;
