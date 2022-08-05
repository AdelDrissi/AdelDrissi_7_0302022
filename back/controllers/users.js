const bcrypt = require('bcrypt');
const { Users } = require('../models/modelss');

exports.readUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByPk(id, {
      attributes: [
        'username',
        'email',
        'biography',
        'password',
        'image',
        'isAdmin',
      ],
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
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    let image;
    if ((oldPassword, newPassword)) {
      const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
      if (!PASSWORD_REGEX.test(newPassword)) {
        res.status(400).json({
          error:
            'Password must be 6 - 18 characters long, must include at least one uppercase letter, one lowercase letter and one number',
        });
      }
      await Users.findByPk(userId);
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { userId: userId } });
      });
    }
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
    }
    await Users.update(
      { ...req.body, image: image },
      { where: { userId: userId } }
    );
    res.status(201).json({ message: 'User ID ' + userId + ' updated.' });
  } catch (error) {
    return res.status(500).send({ error: 'An error has occurred. ' + error });
  }
};
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  Users.destroy({ where: { userId: userId } })
    .then(() =>
      res.status(200).json({ message: ' User ID ' + userId + ' deleted. ' })
    )
    .catch((error) => res.status(400).json({ error }));
};
