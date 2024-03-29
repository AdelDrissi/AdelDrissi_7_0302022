const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const {Users} = require('../models');

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  await Users.findOne({ where: { email: email } }).then((exist) => {
    if (exist) {
      return res
        .status(400)
        .json({ error: 'Email ' + email + ' is already in use' });
    } else {
      Users.findOne({ where: { username: username } })
        .then((exist) => {
          if (!exist) {
            bcrypt.hash(password, 10).then((hash) => {
              Users.create({
                username: username,
                email: email,
                password: hash,
                biography: '',
                image: '',
              })
                .then((user) => {
                  console.log(user);
                  return res.status(201).json({
                    message:
                      'User created with the ID ' + user.dataValues.userId,
                  });
                })
                .catch((error) => {
                  return res
                    .status(500)
                    .json({ error: 'An error has occurred ' + error });
                });
            });
          } else {
            return res
              .status(400)
              .json({ error: 'Username ' + username + ' is already in use' });
          }
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ error: 'An error has occurred ' + error });
        });
    }
  });
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
            const JWToken = JWT.sign(
              {
                userId: user.userId,
                username: user.username,
                email: user.email,
                biography: user.biography,
                image: user.image,
                isAdmin: user.isAdmin,
              },
              process.env.TOKEN_SECRET
            );
            return res.status(200).json({
              token: JWToken,
              id: user.userId,
              username: user.username,
              email: user.email,
              biography: user.biography,
              image: user.image,
              isAdmin: user.isAdmin,
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

exports.auth = (req, res) => {
  Users.findOne({
    where: { userId: res.locals.decodedToken.userId },
    attributes: {
      exclude: ['password'],
    },
  })
    .then((result) => {
      res.status(200).json(result.dataValues);
    })
    .catch((error) => {
      console.log(error);
    });
};
