const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Email is not valid.",
      ],
    },

    thoughts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "thoughts",
      },
    ],

    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
