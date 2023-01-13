const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: [
      {
        type: stringify,
        unique: true,
        required: true,
        trim: true,
      },
    ],
    email: [
      {
        type: stringify,
        required: true,
        unique: true,
        match: [
          /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
          "Email is not valid.",
        ],
      },
    ],
    thoughts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
