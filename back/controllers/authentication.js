const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const Users = require('../models/users');

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
    await Users.findByPk(id);
    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update({ password: hash }, { where: { id: id } });
    });
};

