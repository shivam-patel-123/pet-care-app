const mongoose = require("mongoose");

const caretakerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  rate: {
    type: Number,
  },
  about: {
    type: String,
  },
  available: {
    type: Boolean,
  },
});

const Caretaker = mongoose.model("Caretaker", caretakerSchema);

module.exports = Caretaker;
