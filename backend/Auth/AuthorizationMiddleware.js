module.exports= function authorizationMiddleware(roles) {
    return (req, res, next) => {
      console.log('req:',req.user)
      const userRole = req.user.role.trim();
      if (!roles.includes(userRole))
        return res.status(403).json("Unauthorized Access!");
      next();
    };
  }