const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true },
  departureTime: {
    Hours: { type: Number, required: true },
    Minutes: { type: Number, required: true },
    Seconds: { type: Number, default: 0 },
  },
  seatsAvailable: {
    sleeper: { type: Number, required: true },
    AC: { type: Number, required: true },
  },
  price: {
    sleeper: { type: Number, required: true },
    AC: { type: Number, required: true },
  },
  delayedBy: { type: Number, default: 0 },
});

const Train = mongoose.model('collTrainDetails', trainSchema);
module.exports = Train;
