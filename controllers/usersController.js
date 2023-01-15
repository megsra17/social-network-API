const { Users, Thoughts } = require("../models");
const { findById } = require("../models/Thoughts");

module.exports = {
  create: async function (req, res) {
    try {
      const result = await Users.create(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  find: async function (req, res) {
    try {
      const result = await Users.find();
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  findOne: async function (req, res) {
    try {
      const result = await Users.findById({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async function (req, res) {
    try {
      const result = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async function (req, res) {
    try {
      const user = await Users.findById(req.params.id);
      const thoughtsResult = await Thoughts.deleteMany({
        _id: { $in: user.thoughts },
      });
      const result = await Users.findByIdAndDelete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async function (req, res) {
    const userId = req.params.id;
    const newFriend = req.body.addFriend;
    const updateUser = await Users.findByIdAndUpdate(
      userId,
      { $addToSet: [newFriend] },
      { new: true }
    );
  },
  removeFriend: async function (req, res) {
    const userId = req.params.id;
    const friendToRemove = req.body.removeFriend;
    const updateUser = await Users.findByIdAndUpdate(
      userId,
      { $pull: { friends: { $eq: friendToRemove } } },
      { new: true }
    );
  },
};
