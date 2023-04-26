const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Vet = mongoose.model("Vet", vetSchema);

module.exports = Vet;
