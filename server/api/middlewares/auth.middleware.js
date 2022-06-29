const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const token = req.headers.authorization?.split(' ')[1] || req.headers['x-access-token'];
   if (!token) {
      return next()
   }
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (!err) {
         req.user = decoded;
      }
   });
   next();
}
