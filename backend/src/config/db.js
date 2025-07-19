const mongoose = require("mongoose");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/classroom";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
