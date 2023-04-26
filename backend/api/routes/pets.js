const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require("../middleware/check-auth");

const {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
} = require("../controllers/pets");

router.post("/", createPet);
router.get("/", getPets);
router.get("/:petId", getPetById);
router.patch("/:petId", updatePet);
router.delete("/:petId", deletePet);

module.exports = router;
