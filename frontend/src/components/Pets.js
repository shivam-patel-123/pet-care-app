import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import { DataContext } from "@/context/provider";

const pets = ({ pets, onChildData }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    console.log(pets);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [category, setCategory] = useState("");
    const [allergies, setAllergies] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [weight, setWeight] = useState("");
    const [currentMedications, setCurrentMedications] = useState("");
    const [vaccinationHistory, setVaccinationHistory] = useState("");
    const [medicalHistoryDate, setMedicalHistoryDate] = useState("");
    const [medicalHistoryNote, setMedicalHistoryNote] = useState("");
    const [medicalHistoryVet, setMedicalHistoryVet] = useState("");
    let count = 0;
    const [dummy, setDummy] = useState(false);

    const [data, setData] = useContext(DataContext);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAllergiesChange = (event) => {
        setAllergies(event.target.value);
    };

    const handleBloodGroupChange = (event) => {
        setBloodGroup(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleCurrentMedicationsChange = (event) => {
        setCurrentMedications(event.target.value);
    };

    const handleVaccinationHistoryChange = (event) => {
        setVaccinationHistory(event.target.value);
    };

    const handleMedicalHistoryDate = (event) => {
        setMedicalHistoryDate(event.target.value);
    };
    const handleMedicalHistoryNote = (event) => {
        setMedicalHistoryNote(event.target.value);
    };
    const handleMedicalHistoryVet = (event) => {
        setMedicalHistoryVet(event.target.value);
    };

    const createPet = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            age,
            breed,
            owner: data.user._id,
            category,
            allergies,
            bloodGroup,
            weight,
            currentMedications,
            vaccinationHistory,
            medicalHistoryDate,
            medicalHistoryNote,
            medicalHistoryVet,
        };

        console.log(formData);
        try {
            const res = await axios.post("http://localhost:3000/pets", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(res.data);
            res.status === 200 && count++;
            onChildData(Date.now());
            setShowAddForm(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {}, [count]);

    return (
        // <div>

        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "16px 24px" }}>
            {!showAddForm ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "16px",
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                            }}
                        >
                            My Pets
                        </h1>
                        <Button
                            onClick={() => {
                                setShowAddForm(true);
                            }}
                            variant="contained"
                        >
                            Add Pet
                        </Button>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gap: "8px",
                        }}
                    >
                        {pets &&
                            pets.map((pet) => (
                                <Box
                                    key={pet._id}
                                    sx={{
                                        boxShadow: "1px 2px 8px rgba(55, 84, 170, 0.16)",
                                        display: "flex",
                                        flexDirection: "column",
                                        // margin: "10px",
                                        padding: "12px 16px",
                                        backgroundColor: "white",
                                        borderRadius: "6px",
                                        gap: "8px",
                                    }}
                                >
                                    <p style={{ margin: "0px", fontSize: "18px", marginBottom: "8px" }}>{pet.name}</p>
                                    <Box
                                        sx={{
                                            display: "grid",

                                            gridTemplateColumns: "max-content 1fr",
                                            gridTemplateRows: "max-content",
                                            alignItems: "center",
                                            columnGap: "12px",
                                            rowGap: "8px",
                                        }}
                                    >
                                        {/* <p style={{ textAlign: "right", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Name</p> */}

                                        <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Age</p>
                                        <p style={{ margin: "0px" }}>{pet.age}</p>
                                        <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Breed</p>
                                        <p style={{ margin: "0px" }}>{pet.breed}</p>
                                        {/* <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Owner</p>
                                <p style={{ margin: "0px" }}>Owner Id: {pet.owner}</p> */}
                                        <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Categroy</p>
                                        <p style={{ margin: "0px" }}>{pet.category} </p>
                                        <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Weight</p>
                                        <p style={{ margin: "0px" }}>{pet.weight} </p>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "grid",
                                            flexWrap: "wrap",
                                            gridTemplateColumns: "max-content 1fr",
                                            gridTemplateRows: "max-content",
                                            alignItems: "center",
                                            columnGap: "12px",
                                            rowGap: "8px",
                                        }}
                                    >
                                        {/* <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>CurrentMedications</p>
                                <div style={{ margin: "0px" }}>{pet.currentMedications && pet.currentMedications.map((med) => <p style={{ margin: "0px" }}>{med}</p>)}</div> */}
                                        <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Allergies</p>
                                        <div style={{ margin: "0px" }}>{pet.allergies && pet.allergies.map((med) => <p style={{ margin: "0px" }}>{med}</p>)}</div>
                                        {/* <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Medical History</p>
                                <div style={{ margin: "0px" }}>
                                    {pet.medicalHistory &&
                                        pet.medicalHistory.map((med) => (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    border: "1px solid black",
                                                }}
                                            >
                                                <div>{med.medicalNote}</div>
                                                <div>{med.date}</div>
                                                <div>{med.vet}</div>
                                            </div>
                                        ))}{" "}
                                </div>

                                <p style={{ textAlign: "left", color: "#939393", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Vaccination History</p>

                                <div style={{ margin: "5px" }}>{pet.vaccinationHistory && pet.vaccinationHistory.map((med) => <p>{med}</p>)}</div> */}
                                    </Box>
                                </Box>
                            ))}
                    </div>
                </>
            ) : (
                <div
                    style={{
                        width: 900,
                        margin: "0 auto",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "12px",
                            borderRadius: "8px",
                            boxShadow: "1px 2px 8px rgba(55, 84, 170, 0.16)",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                style={{
                                    justifySelf: "start",
                                }}
                                onClick={() => {
                                    setShowAddForm(false);
                                }}
                            >
                                Back
                            </Button>
                            <h3 style={{ textAlign: "center" }}>Enter your pet details</h3>
                        </div>
                        <Box
                            sx={{
                                display: "grid",
                                // flexWrap: "wrap",
                                // justifyContent: "space-around",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                overflow: "hidden",
                                backgroundColor: "white",
                                // padding: "12px",
                                gap: "12px",
                                marginBottom: "20px",
                            }}
                        >
                            <TextField id="outlined-basic" label="name" variant="outlined" sx={{ margin: "0rem" }} value={name} onChange={handleNameChange} />
                            <TextField id="outlined-basic" label="age" variant="outlined" sx={{ margin: "0rem" }} value={age} onChange={handleAgeChange} />
                            <TextField id="outlined-basic" label="breed" variant="outlined" sx={{ margin: "0rem" }} value={breed} onChange={handleBreedChange} />
                            <TextField id="outlined-basic" label="category" variant="outlined" sx={{ margin: "0rem" }} value={category} onChange={handleCategoryChange} />
                            <TextField id="outlined-basic" label="allergies" variant="outlined" sx={{ margin: "0rem" }} value={allergies} onChange={handleAllergiesChange} />
                            <TextField id="outlined-basic" label="bloodGroup" variant="outlined" sx={{ margin: "0rem" }} value={bloodGroup} onChange={handleBloodGroupChange} />
                            <TextField id="outlined-basic" label="weight" variant="outlined" sx={{ margin: "0rem" }} value={weight} onChange={handleWeightChange} />
                            <TextField
                                id="outlined-basic"
                                label="currentMedications"
                                variant="outlined"
                                sx={{ margin: "0rem" }}
                                value={currentMedications}
                                onChange={handleCurrentMedicationsChange}
                            />
                            <TextField
                                id="outlined-basic"
                                label="vaccinationHistory"
                                variant="outlined"
                                sx={{ margin: "0rem" }}
                                value={vaccinationHistory}
                                onChange={handleVaccinationHistoryChange}
                            />
                            <Box
                                sx={{
                                    gridColumn: "1/-1",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "12px",
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="medicalHistory"
                                    variant="outlined"
                                    sx={{ margin: "0rem" }}
                                    value={medicalHistoryDate}
                                    onChange={handleMedicalHistoryDate}
                                />{" "}
                                <TextField
                                    id="outlined-basic"
                                    label="medicalHistory"
                                    variant="outlined"
                                    sx={{ margin: "0rem" }}
                                    value={medicalHistoryNote}
                                    onChange={handleMedicalHistoryNote}
                                />{" "}
                                <TextField
                                    id="outlined-basic"
                                    label="medicalHistory"
                                    variant="outlined"
                                    sx={{ margin: "0rem" }}
                                    value={medicalHistoryVet}
                                    onChange={handleMedicalHistoryVet}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button onClick={createPet} style={{ width: "100%" }} variant="contained">
                                Add Pet
                            </Button>
                        </Box>
                    </div>
                </div>
            )}
        </div>
        // </div>
    );
};

export default pets;
