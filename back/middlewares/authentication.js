const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (req.headers.authorization == undefined) {
    console.log('Pas de token dans la route ' + req.originalUrl);
  } else {
    const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          return res
            .status(201)
            .send("Vous n'étes pas connecter ");
        }
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


    try {
      if (!!decodedToken) {
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          // On indique si l'id est le même => false = Id non valide
          console.log('Pas bon');
          return res.send(' pas le meme ID');
        } else {
          res.locals.decodedToken = decodedToken;
          next();
        }
      }
    } catch (err) {
      (err) => res.status(400).json(err);
    }
  }
};
