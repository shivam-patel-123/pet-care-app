const express = require("express");
const router = express.Router();

const {
  getAppointments,
  createAppointment,
  getAppointmentById,
  deleteAppointment,
} = require("../controllers/appointments");

router.get("/", getAppointments);
router.post("/", createAppointment);
router.get("/:appointmentId", getAppointmentById);
router.delete("/:appointmentId", deleteAppointment);

module.exports = router;
