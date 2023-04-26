import React, { useEffect, useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import furrycare from "../images/furrycare.svg";
import { DataContext } from "@/context/provider";
import TextField from "@mui/material/TextField";
import axios from "axios";

const admin = () => {
  const [data, setData] = useContext(DataContext);
  const [vets, setVets] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  let count = 0;

  const getVets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      console.log(response.data);
      // setVets(response.data.users);
      filterVets(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const filterVets = (users) => {
    const filteredUsers = users.filter((user) => user.role === "vet");
    setVets(filteredUsers);
  };

  const addVet = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        name: name,
        email: email,
        password: pass,
        role: "vet",
      });
      console.log(response.data);
      count++;
      getVets();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVets();
  }, [count]);

  return (
    <div>
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
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Add Vet</h2>
          <TextField
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />{" "}
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />{" "}
          <TextField
            onChange={(e) => setPass(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button onClick={addVet} variant="contained">
            Add Vet
          </Button>
        </Box>
        <Box>
          <h2>Vets</h2>
          {vets.map((vet) => (
            <div key={vet._id}>
              <p>{vet.name}</p>
              <p>{vet.email}</p>
            </div>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default admin;
