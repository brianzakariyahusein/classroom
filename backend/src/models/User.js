const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        // email validation regex
        return /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid email address! please use gmail.com, yahoo.com, or outlook.com`,
    },
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "student",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    validate: {
      validator: function (value) {
        // password validation regex
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    },
  },
});

// Enkripsi password sebelum simpan
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method untuk cek password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
