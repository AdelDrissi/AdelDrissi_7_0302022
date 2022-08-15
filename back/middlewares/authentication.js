const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.authorization == undefined) {
    console.log('Pas de token dans la route ' + req.originalUrl);
  } else {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      function (err, decoded) {
        if (err) {
          err = {
            name: 'jwt expired',
            message: 'La connexion est expriré, merci de vous reconnecter',
          };
          res.status(401).json({ message: err });
        } else {
          return decoded;
        }
      }
    );

    const userId = decodedToken.userId;
    if (!token) {
      return res
        .status(403)
        .send("Un token est requis pour l'authentification");
    }

    try {
      console.log(req.body.UserId, userId);
      if (req.body.userId && req.body.userId !== userId) {
        // On indique si l'id est le même => false = Id non valide
        console.log('Pas bon');
        return res.send('pas le meme ID');
      } else {
        res.locals.decodedToken = decodedToken;
        next();
      }
    } catch (err) {
      (err) => res.status(400).json(err);
    }
  }
};
