const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
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
    res.status(403).send({ err: 'Missing parameters' });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user.id });
  } catch (err) {
    res.status(200).json(err);
  }
};