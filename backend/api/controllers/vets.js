const Vet = require("../models/vet");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");

//get vets
const getVets = asyncWrapper(async (req, res) => {
  const vets = await Vet.find();
  res.status(200).json({
    vets,
  });
});

//create vet
const createVet = asyncWrapper(async (req, res) => {
  const vet = new Vet({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
  });
  await vet.save();
});

module.exports = {
  getVets,
  createVet,
};
