const { json } = require("body-parser");
const { User, Thoughts } = require("../models");
const { findById } = require("../models/Thoughts");

module.exports = {
  create: async function (req, res) {
    try {
      const result = await User.create(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  find: async function (req, res) {
    try {
      const result = await User.find();
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  findOne: async function (req, res) {
    try {
      const result = await findById({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async function (req, res) {
    try {
      const result = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async function (req, res) {
    try {
      const user = await User.findById(req.params.id);
      const thoughtsResult = await Thoughts.deleteMany({
        _id: { $in: user.thoughts },
      });
      const result = await User.findByIdAndDelete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async function (req, res) {
    const userId = req.params.id;
    const newFriend = req.body.addFriend;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: [newFriend] },
      { new: true }
    );
  },
  removeFriend: async function (req, res) {
    const userId = req.params.id;
    const friendToRemove = req.body.removeFriend;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: { $eq: friendToRemove } } },
      { new: true }
    );
  },
};
