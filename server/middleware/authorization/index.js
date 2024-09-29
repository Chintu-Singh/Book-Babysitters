const isAdmin = () => {
  return (req, res, next) => {
    if (!req.user.admin)
      return res.status(401).json({ error: 'access denied' });
    next();
  };
};

module.exports = isAdmin;
