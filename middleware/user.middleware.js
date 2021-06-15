const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function generateHash(req, res, next) {
  bcrypt.hash(req.body.password, 12, (err, hash) => {
    if (err) {
      next("Server error");
    }
    req.body.passwordHash = hash;
    next();
  });
}

function generateToken(req, res, next) {
  jwt.sign(
    { id: req.user.id, email: req.user.email },
    "soneshSecret",
    (err, token) => {
      if (err) {
        next(err.message);
      }
      req.user.token = token;
      next();
    }
  );
}

function validatePassword(req, res, next) {
  bcrypt.compare(req.body.password, req.user.password, (err, result) => {
    if (err) {
      next(err);
    }
    if (result) {
      next();
    } else {
      next("Invalid Password");
    }
  });
}

function validateToken(req, res, next) {
  let token = req.headers.authorization;
  token = token.slice(7);
  if (!token) {
    next("Authorization token not provided");
  }

  jwt.verify(token, "soneshSecret", (err, decoded) => {
    if (err) {
      next("Invalid Token");
    } else {
      req.user = decoded;
      req.user.token = token;
      next();
    }
  });
}

module.exports = {
  generateHash,
  generateToken,
  validatePassword,
  validateToken,
};
