const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  const { _id, name, email, isAdmin } = user;
  return jwt.sign({ _id, name, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).send({ message: 'No token' });
  }
};
