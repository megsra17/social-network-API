const mongoose = require("mongoose");

const ReactionsSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: "Needs reaction",
      maxlength: 280,
    },
    username: {
      type: String,
      required: "Needs username",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => new Date(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ReactionsSchema;
