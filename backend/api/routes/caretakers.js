const express = require("express");
const router = express.Router();

const { getCaretakers } = require("../controllers/caretakers");

router.get("/", getCaretakers);

module.exports = router;
