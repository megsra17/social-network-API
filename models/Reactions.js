const mongoose = require("mongoose");
const { Reactions } = require(".");

const ReactionsSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      defualts: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => formatDate(timeStamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = Reactions;
