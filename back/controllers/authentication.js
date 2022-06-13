const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { Users } = require('../models/modelss');

exports.signUp = async (req, res) => {
  console.log(req.body);
  const { username, email, image, password, biography } = req.body;
  const userCreated = await Users.create({
    username,
    email,
    password,
    biography,
    image,
  });

  if (userCreated) {
    return res.status(201).json({ userCreated });
  } else {
    return res.status(500).json({ error: 'erreur' });
  }
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (email == null || password == null) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }
  await Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const JWToken = sign(
              {
                id: user.id,
                username: user.username,
                email: user.email,
                biography: user.biography,
                image: user.image,
              },
              process.env.SECRET_KEY
            );
            return res.status(200).json({
              token: JWToken,
              id: user.id,
              username: user.username,
              email: user.email,
              biography: user.biography,
              image: user.image,
            });
          } else {
            return res.status(403).json({ error: 'Invalid password.' });
          }
        });
      } else {
        return res.status(404).json({ error: email + ' do not exist.' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: 'An error has occurred. ' + error });
    });
};
