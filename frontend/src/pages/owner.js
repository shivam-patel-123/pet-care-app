import React, { useState, useContext, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { DataContext } from "@/context/provider";
import axios from "axios";
import Pets from "@/components/Pets";
import Store from "@/components/Store";
import Caretakers from "@/components/Caretakers";
import Bookings from "@/components/Bookings";

const owner = () => {
    const [data, setData] = useContext(DataContext);
    const [pets, setPets] = useState([]);
    const [vets, setVets] = useState([]);
    const [caretakers, setCaretakers] = useState([]);
    const [childData, setChildData] = useState("");

    const handleChildData = (data) => {
        setChildData(data);
    };

    const getPets = async () => {
        try {
            const res = await axios.get("http://localhost:3000/pets", {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.log(res.data);
            const filteredPets = res.data.pets.filter((pet) => pet.owner === data.user._id);
            setPets(filteredPets);
            console.log(filteredPets);
        } catch (error) {
            console.log(error);
        }
    };

    const getVets = async () => {
        try {
            const res = await axios.get("http://localhost:3000/vets", {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.log(res.data);
            setVets(res.data.vets);
        } catch (error) {
            console.log(error);
        }
    };

    const getCaretakers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/caretakers", {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.log(res.data);
            setCaretakers(res.data.caretakers);
        } catch (error) {
            console.log(error);
        }
    };

    const choice = () => {
        if (data.navChoice === "Pets") {
            return <Pets pets={pets} onChildData={handleChildData} />;
        } else if (data.navChoice === "Store") {
            return <Store />;
        } else if (data.navChoice === "Caretakers") {
            return <Caretakers caretakers={caretakers} />;
        } else if (data.navChoice === "Book Appointment") {
            return <Bookings pets={pets} vets={vets} />;
        }
    };

    useEffect(() => {
        getCaretakers();
        getPets();
        getVets();
    }, [childData]);

    console.log("mydata", data);
    return (
        <div>
            <NavbarComponent />
            {choice()}
        </div>
    );
};

export default owner;
