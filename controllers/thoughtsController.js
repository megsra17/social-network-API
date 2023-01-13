const { model } = require("mongoose");
const { User } = require("../models");

module.exports = {
  create: async function (req, res) {
    try {
      const result = await User.create(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
