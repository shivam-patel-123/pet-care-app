const User = require("../models/user");
const Pet = require("../models/pet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");

//create user
const signup = asyncWrapper(async (req, res) => {
  const existingUser = await User.find({ email: req.body.email });
  if (existingUser.length >= 1) {
    return res.status(409).json({
      message: "Mail exists",
    });
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
    name: req.body.name,
    role: req.body.role,
  });
  await user.save();
  res.status(201).json({
    message: "User created",
  });
});

//get users
const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

const getPets = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.userId).populate("pets");
  res.status(200).json({
    pets: user.pets,
  });
});

//login user
const login = asyncWrapper(async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length < 1) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  const result = await bcrypt.compare(req.body.password, user[0].password);
  if (result) {
    const token = jwt.sign(
      {
        email: user[0].email,
        userId: user[0]._id,
      },
      //in order for this to work, I added the password I've created for my user to the .env file
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Auth successful",
      token: token,
      user: user[0],
    });
  }
  res.status(401).json({
    message: "Auth failed",
  });
});

// //assign pet to user
// const assignPet = asyncWrapper(async (req, res) => {
//   const user = await User.findById(req.params.userId);
//   user.pets.push(req.params.petId);
//   await user.save();
//   res.status(200).json({
//     message: "Pet assigned",
//   });
// });

//delete user
const deleteUser = asyncWrapper(async (req, res) => {
  await User.remove({ _id: req.params.userId });
  res.status(200).json({
    message: "User deleted",
  });
});

module.exports = {
  signup,
  getUsers,
  login,
  deleteUser,
  getPets,
  // assignPet,
};
