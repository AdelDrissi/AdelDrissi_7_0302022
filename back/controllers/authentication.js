const UserModel = require('../models/users');
const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {
  console.log(req);
  const { username, email, password, biography } = req.body;
  try {
    const user = await UserModel.create({
      username,
      email,
      password,
      biography,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(403).send({ err });
  }
};



