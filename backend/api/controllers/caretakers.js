const Caretaker = require("../models/caretaker");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");

//get caretakers
const getCaretakers = asyncWrapper(async (req, res) => {
  const caretakers = await Caretaker.find();
  res.status(200).json({
    caretakers,
  });
});

module.exports = {
  getCaretakers,
};
