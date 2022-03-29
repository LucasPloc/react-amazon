const express = require('express');
const User = require('../models/userModel.js');
const data = require('../data.js');

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

module.exports = seedRouter;
