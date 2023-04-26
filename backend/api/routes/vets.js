const express = require("express");
const router = express.Router();

const { getVets, createVet } = require("../controllers/vets");

router.get("/", getVets);
router.post("/", createVet);

module.exports = router;
