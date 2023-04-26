const User = require("../models/user");
const Pet = require("../models/pet");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");

//create pet
const createPet = asyncWrapper(async (req, res) => {
  const pet = new Pet({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    breed: req.body.breed,
    owner: req.body.owner,
    category: req.body.category,
    allergies: req.body.allergies,
    bloodGroup: req.body.bloodGroup,
    weight: req.body.weight,
    currentMedications: req.body.currentMedications,
    vaccinationHistory: req.body.vaccinationHistory,
    medicalHistory: req.body.medicalHistory,
  });
  await pet.save();

  res.status(201).json({
    message: "Pet created",
    pet,
  });
});

//get all pets
//get pets
const getPets = asyncWrapper(async (req, res) => {
  const pets = await Pet.find();
  res.status(200).json({
    pets,
  });
});

//get pet by id
const getPetById = asyncWrapper(async (req, res) => {
  const pet = await Pet.findById(req.params.petId);
  res.status(200).json({
    pet,
  });
});

//update pet
const updatePet = asyncWrapper(async (req, res) => {
  const pet = await Pet.findById(req.params.petId);

  pet.medicalHistory.push(req.body);
  console.log(pet.medicalHistory);
  console.log(req.body);
  await pet.save();
  res.status(200).json({
    message: "Medical history updated",
    updatedPet: pet,
  });
});

//delete pet
const deletePet = asyncWrapper(async (req, res) => {
  const pet = await Pet.findById(req.params.petId);
  if (pet.owner.toString() !== req.userData.userId) {
    return res.status(401).json({
      message: "You are not authorized to delete this pet",
    });
  }
  await pet.remove();
  res.status(200).json({
    message: "Pet deleted",
  });
});

module.exports = {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
};
