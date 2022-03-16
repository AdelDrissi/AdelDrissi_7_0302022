const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.readUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByPk(id, {
      attributes: ['username', 'email', 'biography', 'image', 'isAdmin'],
    }).then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User ID ' + id + ' not found.' });
      } else res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).send({ error: 'An error has occurred. ' + error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    let image;
    if ((oldPassword, newPassword)) {
      const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
      if (!PASSWORD_REGEX.test(newPassword)) {
        return res.status(400).json({
          error:
            'Password must be 6 - 18 characters long, must include at least one uppercase letter, one lowercase letter and one number',
        });
      }
      await Users.findByPk(id);
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { id: id } });
      });
    }

    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
    }
    await Users.update({ ...req.body, image: image }, { where: { id: id } });
    res.status(201).json({ message: 'User ID ' + id + ' updated.' });
  } catch (error) {
    res.status(500).send({ error: 'An error has occurred. ' + error });
  }
};
