const mongoose = require("mongoose");
const Pet = require("./pet");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  role: {
    type: String,
    enum: ["owner", "admin", "vet"],
    default: "owner",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
