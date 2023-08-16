const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add your username"],
    },
    email: {
      type: String,
      requird: [true, "Please add your email address"],
      unique: [true, "Email address is already taken "],
    },
    password: {
      type: String,
      requird: [true, "Please add your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
