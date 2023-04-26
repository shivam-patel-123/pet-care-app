const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./api/db/connect");

//import routes
const petsRoutes = require("./api/routes/pets.js");
const usersRoutes = require("./api/routes/users.js");
const caretakersRoutes = require("./api/routes/caretakers.js");
const vetsRoutes = require("./api/routes/vets.js");
const appointmentsRoutes = require("./api/routes/appointments.js");

//use morgan before the routes
//this specific one logs the request
//like, if we sent a request to orders, it logs "GET /orders/"
app.use(morgan("dev"));
//this parses the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
//this will json data easily readable to us
app.use(bodyParser.json());

//handle cors
//need to use it before routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//routes which should handle requests
app.use("/pets", petsRoutes);
app.use("/users", usersRoutes);
app.use("/caretakers", caretakersRoutes);
app.use("/vets", vetsRoutes);
app.use("/appointments", appointmentsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//this is a middleware that handles all errors
//it will be executed if the above middleware is executed
//this will fire for instance when operations related to the database fail

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
