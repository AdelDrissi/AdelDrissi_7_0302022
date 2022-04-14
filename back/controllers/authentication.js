const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.signUp = async (req,) => {
   console.log(req.body);
  const { username, email, password, biography } = req.body;
  const userCreated = await Users.create({
      username,
      email,
      password,
      biography,
  })

  if(userCreated) {
    console.log(userCreated);
  }
};
  if (username.length >= 16 || username.length <= 2) {
    return res
      .status(400)
      .json({ error: 'Username must be 3 - 15 characters long' });
  }
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(400)
      .json({ error: 'Email is not valid(ex: email@email.com)' });
  }
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      error:
        'Password must be 6 - 18 characters long, must include at least one uppercase letter, one lowercase letter and one number',
    });
  }


 Users.findOne({ where: { } }) .then((exist) => {
  if (exist) 
   {
    return res
      .status(409)
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
            })
              .then((user) => {
                return res
                  .status(201)
                  .json({ message: 'User created with the ID ' + user.id });
              })
              .catch((error) => {
                return res
                  .status(500)
                  .json({ error: 'An error has occurred ' + error });
              });
          });
        } else {
          return res
            .status(409)
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

exports.signIn = async (req,res) => {
  const { email, password } = req.body;
  try {
    const Users = await UserModel.login(email, password);
  } catch (err) {
    res.status(200).json(err);
  }
};
