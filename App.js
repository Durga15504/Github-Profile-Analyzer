require("dotenv").config();

const express = require("express");
const cors = require("cors");

const githubRoutes = require("./routes/githubRoutes");

// Connect Database
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", githubRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});