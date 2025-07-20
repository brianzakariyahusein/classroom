const express = require("express");
const cors = require("cors");
require("./config/db");
const authRoutes = require("./routes/auth");
// const classroomRoutes = require("./routes/classroom");

const app = express();

app.use(cors());
app.use(express.json());

// Route Test
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
// app.use("/api/classroom", classroomRoutes);

module.exports = { app };
