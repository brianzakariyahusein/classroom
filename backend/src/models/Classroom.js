const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the classroom title"],
    },
    description: {
      type: String,
    },
    code: {
      type: String,
      required: [true, "Please enter the classroom code"],
      unique: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please assign a teacher to the classroom"],
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please add at least one student to the classroom"],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
