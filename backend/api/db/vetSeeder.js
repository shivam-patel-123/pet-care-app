const mongoose = require("mongoose");
const Vet = require("../models/vet");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const vets = [
  {
    name: "John vet Doe",
  },
  {
    name: "Jane vet Smith",
  },
  {
    name: "Mike vet Johnson",
  },
  {
    name: "Sarah vet  Brown",
  },
  {
    name: "David vet Lee",
  },
];

Vet.insertMany(vets)
  .then(() => {
    console.log("Data seeded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
