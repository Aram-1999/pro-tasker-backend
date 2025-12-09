const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToDB = require("./config/connection");

const PORT = process.env.PORT || 4000;

const app = express();

require("dotenv").config();

connectToDB();

// ======= MIddlewares =======
app.use(morgan("dev")); //logger
app.use(express.json()); //body parser
app.use(cors({ origin: process.env.FRONTEND_URL}));

// ======= Routes =======
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
