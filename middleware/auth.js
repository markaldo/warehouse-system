// middleware/auth.js
const authorize = (roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send('Access denied');
      }
      next();
    };
  };
  
  module.exports = { authorize };
  