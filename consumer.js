// Import kafkajs module and create a Kafka Consumer object
const { Kafka } = require("kafkajs");
const kafka = new Kafka({ brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "my-group" });

// Connect to Kafka and subscribe to topic
async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-credentials", fromBeginning: true });

  // Log messages received from topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message from topic ${topic}, partition ${partition}: ${message.value}`);
    },
  });
}
run().catch(console.error);
