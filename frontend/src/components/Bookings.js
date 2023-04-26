import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import axios from "axios";

export default function Bookings({ pets, vets }) {
  const [pet, setPet] = useState("");
  const [petId, setPetId] = useState("");
  const [petName, setPetName] = useState("");
  const [vet, setVet] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handlePet = (event) => {
    console.log(event.target.value);
    setPet(event.target.value);
    setPetId(event.target.value._id);
    setPetName(event.target.value.name);
  };
  const handleVet = (event) => {
    setVet(event.target.value);
  };

  const handleReason = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(pet, petName, vet, reason, date, time);

    try {
      const res = await axios.post(
        "http://localhost:3000/appointments",
        {
          petName,
          petId,
          vet,
          reason,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      retunr;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ minWidth: 300, maxWidth: 350, marginTop: "5rem" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Pet</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pet}
            label="Select Pet"
            onChange={handlePet}
          >
            {pets &&
              pets.map((pet) => <MenuItem value={pet}>{pet.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>{" "}
      <Box sx={{ minWidth: 300, maxWidth: 350, margin: "1rem" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Vet</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vet}
            label="Select Vet"
            onChange={handleVet}
          >
            {vets &&
              vets.map((vet) => (
                <MenuItem value={vet._id}>{vet.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginTop: "1rem" }} htmlFor="date-input">
          Choose a date:
        </label>
        <input
          style={{ marginBottom: "1rem" }}
          type="date"
          id="date-input"
          value={date}
          onChange={handleDateChange}
        />

        <label htmlFor="time-input">Choose a time:</label>
        <input
          type="time"
          id="time-input"
          value={time}
          onChange={handleTimeChange}
        />
      </Box>
      <TextField
        sx={{ margin: "1rem" }}
        id="standard-basic"
        label="Appointment Reason"
        variant="standard"
        value={reason}
        onChange={handleReason}
      />
      <Button onClick={handleSubmit} variant="outlined">
        Book Appointment
      </Button>
    </Box>
  );
}
