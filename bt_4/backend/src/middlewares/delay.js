const delay = (req, res, next) => {
  setTimeout(() => {
    if (req.header.authorization) {
      const token = req.header.authorization.split(" ")[1];
      console.log(">>> Check Token: ", token);
      next();
    }
  }, 3000);
};

module.exports = delay;
