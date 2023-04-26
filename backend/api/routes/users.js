const express = require("express");
const router = express.Router();

const {
  signup,
  getUsers,
  login,
  deleteUser,
  getPets,
} = require("../controllers/users");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUsers);
router.delete("/:userId", deleteUser);
router.get("/:userId/pets", getPets);

module.exports = router;
