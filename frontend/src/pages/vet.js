import React, { useEffect, useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import furrycare from "../images/furrycare.svg";
import { DataContext } from "@/context/provider";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const vet = () => {
  const [data, setData] = useContext(DataContext);
  const [input, setInput] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [note, setNote] = useState("");
  const [pet, setPet] = useState({});
  // const [medicalHistory, setMedicalHistory] = useState([]);

  const getAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      console.log(response.data);
      setAppointments(response.data.appointments);
      setFilteredAppointments(response.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  const getPet = async (petId) => {
    try {
      const response = await axios.get(`http://localhost:3000/pets/${petId}`);
      console.log(response.data.pet);
      setPet(response.data.pet);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e, petId) => {
    e.preventDefault();
    console.log(petId);
    console.log(Date.now().toString());
    console.log(note);
    console.log(data.user.name);

    try {
      const response = await axios.patch(
        `http://localhost:3000/pets/${petId}`,
        {
          date: new Date(Date.now()).toLocaleString(),
          medicalNote: note,
          vet: data.user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      getAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const filterAppointmentsByPet = (petName) => {
    const filteredAppointments = appointments.filter((appointment) =>
      appointment.petName.toLowerCase().includes(petName.toLowerCase())
    );
    setFilteredAppointments(filteredAppointments);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    filterAppointmentsByPet(e.target.value);
  };

  return (
    <Box>
      {" "}
      <Box
        sx={{
          width: "100%",
          height: "100px",
          backgroundColor: "#1976d2",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Image src={furrycare} alt="Furry Care" width={150} height={150} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <TextField
          sx={{ margin: "1rem" }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={input}
          onChange={handleInputChange}
        />
      </Box>
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {filteredAppointments.map((appointment) => (
          <Box
            sx={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
            }}
            key={appointment._id}
          >
            <h3>{appointment.petName}</h3>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <Accordion onClick={() => getPet(appointment.petId)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                  <div>
                    {pet.medicalHistory ? (
                      pet.medicalHistory.map((history) => (
                        <div
                          style={{
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px",
                          }}
                        >
                          <div>Date: {history.date}</div>
                          <div>Note: {history.medicalNote}</div>
                          <div>Vet: {history.vet}</div>
                        </div>
                      ))
                    ) : (
                      <p>No medical history</p>
                    )}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></TextField>
            <Button
              onClick={(e) => {
                handleSubmit(e, appointment.petId);
              }}
              sx={{ marginTop: "1rem" }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default vet;
