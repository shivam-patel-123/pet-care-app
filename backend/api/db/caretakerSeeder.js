const mongoose = require("mongoose");
const Caretaker = require("../models/caretaker");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const caretakers = [
  {
    name: "John Doe",
    rate: 20,
    about: "I have over 10 years of experience in taking care of animals.",
    available: true,
  },
  {
    name: "Jane Smith",
    rate: 25,
    about:
      "I am a certified animal caretaker and have a passion for animal welfare.",
    available: true,
  },
  {
    name: "Mike Johnson",
    rate: 15,
    about:
      "I am a pet lover and have experience taking care of various types of animals.",
    available: false,
  },
  {
    name: "Sarah Brown",
    rate: 30,
    about:
      "I am an animal behaviorist and specialize in taking care of dogs and cats.",
    available: true,
  },
  {
    name: "David Lee",
    rate: 18,
    about:
      "I am a veterinary technician and have experience in medical care for animals.",
    available: false,
  },
];

Caretaker.insertMany(caretakers)
  .then(() => {
    console.log("Data seeded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
