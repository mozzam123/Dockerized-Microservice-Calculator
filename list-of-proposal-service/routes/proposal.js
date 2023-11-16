const express = require("express");
const router = express.Router();
const { Kafka } = require("kafkajs");
const { MongoClient } = require("mongodb");
const DB = process.env.DATABASE
const PORT = process.env.PORT

// Create Kafka consumer instance
const kafka = new Kafka({
  clientId: "proposal-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "proposal-group",
  maxWaitTimeInMs: 50,
});

consumer.connect();
console.log("Connected to consumer");

consumer.subscribe({ topic: "user-credentials" });
console.log(`Subscribed to topic`);

let latestUsername;

consumer.run({
  eachMessage: async ({ message }) => {
    const { username } = JSON.parse(message.value.toString());
    latestUsername = username;
    console.log(`Received message with username: ${username}`);
  },
});

// Function to fetch user data from MongoDB
async function fetchUserData(username) {
  const url = `${DB}`;
  const dbName = "user_calculations";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("calculations");
    let documents;

    if (username === "admin") {
      // Fetch the latest calculation for each user
      documents = await collection
        .aggregate([
          { $sort: { createdAt: -1 } },
          { $group: { _id: "$username", calculation: { $first: "$$ROOT" } } },
          { $replaceRoot: { newRoot: "$calculation" } },
        ])
        .toArray();
    } else {
      documents = await collection.find({ username }).toArray();
    }

    return documents;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
}

router.get("/", async (req, res) => {
  res.redirect(`http://127.0.0.1:${PORT}/`);
});

// Proposal Page
router.get("/proposal", async (req, res) => {
  try {
    const currentUser = latestUsername;
    const userData = await fetchUserData(currentUser);
    console.log(userData);

    // Update the remarks field for the last calculation
    if (userData.length > 0) {
      userData[userData.length - 1].remarks = 'last generated id';
    }

    res.render("proposal", { currentUser, userData });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/proposal", (req, res) => {
  console.log("parameters is : ", req.body);
  res.redirect(`http://127.0.0.1:${PORT}/calc`);
});

module.exports = router;
