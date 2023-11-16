const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  calculationId: {
    type: Number,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  principalAmt: {
    type: String,
    required: true,
  },
  totalAmt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
    required: false
  }
});

const Calculation = new mongoose.model("Calculation", calculationSchema);

module.exports = Calculation;
