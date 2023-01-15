const { Users, Thoughts } = require("../models");

module.exports = {
  create: async function (req, res) {
    try {
      const result = await Thoughts.create(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  find: async function (req, res) {
    try {
      const result = await Thoughts.find();
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  findOne: async function (req, res) {
    try {
      const result = await Thoughts.findById({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async function (req, res) {
    try {
      const result = await Thoughts.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async function (req, res) {
    try {
      const result = await Thoughts.findByIdAndDelete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addReaction: async function (req, res) {
    const thoughtId = req.params.id;
    const newReaction = req.body.addReaction;
    const updateThought = await Thoughts.findByIdAndUpdate(
      thoughtId,
      { $addToSet: [newReaction] },
      { new: true }
    );
  },
  removeReaction: async function (req, res) {
    const thoughtId = req.params.id;
    const reactionToRemove = req.body.removeReaction;
    const updateThought = await Thoughts.findByIdAndDelete(
      thoughtId,
      { $pull: { reactions: { $eq: reactionToRemove } } },
      { new: true }
    );
  },
};
