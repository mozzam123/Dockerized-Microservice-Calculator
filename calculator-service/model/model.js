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
    type: Number,
    required: true,
  },
  principalAmt: {
    type: Number,
    required: true,
  },
  totalAmt: {
    type: Number,
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
