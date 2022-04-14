const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { username, email, password, biography } = req.body;
  const userCreated = await Users.create({
    username,
    email,
    password,
    biography,
  });

  if (userCreated) {
    return res.status(201).json({ userCreated });
  } else {
    return res.status(500).json({ error: 'erreur' });
  }
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const Users = await Users.login(email, password);
  } catch (err) {
    res.status(200).json(err);
  }
};
