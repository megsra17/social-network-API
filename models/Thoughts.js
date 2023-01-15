const mongoose = require("mongoose");
const reactionSchema = require("./Reactions");

const ThoughtsSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: "needs thought text",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //add date
    },
    username: {
      type: String,
      required: "needs username",
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = mongoose.model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
