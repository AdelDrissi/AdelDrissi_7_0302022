const UserModel = require('../models/users');
const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.create({ username, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(403).send({err});
  }
};
