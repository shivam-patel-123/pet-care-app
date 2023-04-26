import { Avatar, Box, Button, Card } from "@mui/material";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import avatar0 from "../images/User_1.png"
import avatar1 from "../images/User_2.png"
import avatar2 from "../images/User_3.png"
import avatar3 from "../images/User_4.png"
import avatar4 from "../images/User_5.png"
import Image from "next/image";

const Caretakers = ({ caretakers }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  console.log();

  return (
    <Box sx={{
      padding: "15px",
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
    }}>
      {caretakers.map((caretaker, i) => (
        <Card variant="outlined"
          sx={{
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-between",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            backgroundColor: "#fafafa",
            borderRadius: "10px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            margin: "5px",
            paddingInline: "25px",
            paddingBlock: "20px"
          }}
          key={caretaker._id}
        >
          
          <Image src={i === 0 ? avatar0 : i === 1 ? avatar1 : i === 2 ? avatar2 : i === 3 ? avatar3 : avatar4} width={120} height={120}></Image>
          
          <h2>{caretaker.name}</h2>
          <p>About</p>
          <p>{caretaker.about}</p>
          <h4>Price: {caretaker.rate}$/hour</h4>
          <Button sx={{width: "250px"}} onClick={handleOpen} variant="contained">
            Hire
          </Button>{" "}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="date-input">Choose a date:</label>
                <input
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
            </Box>
          </Modal>
        </Card>
      ))}
    </Box>
  );
};

export default Caretakers;
