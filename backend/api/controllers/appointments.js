const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");

//get appointments
const getAppointments = asyncWrapper(async (req, res) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    appointments,
  });
});

//create appointment
const createAppointment = asyncWrapper(async (req, res) => {
  const appointment = new Appointment({
    _id: new mongoose.Types.ObjectId(),
    petName: req.body.petName,
    petId: req.body.petId,
    vet: req.body.vet,
    date: req.body.date,
    time: req.body.time,
    reason: req.body.reason,
  });
  await appointment.save();
});

//get appointment by id
const getAppointmentById = asyncWrapper(async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId);
  res.status(200).json({
    appointment,
  });
});

//delete appointment
const deleteAppointment = asyncWrapper(async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId);

  await appointment.remove();
  res.status(200).json({
    message: "Appointment deleted",
  });
});

module.exports = {
  getAppointments,
  createAppointment,
  getAppointmentById,
  deleteAppointment,
};
