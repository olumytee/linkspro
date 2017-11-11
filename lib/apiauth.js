const Users = require('./db/model').Users;

const apiAuth = () => {
  return (req, res, next) => {
    const key = req.body;
    Users.findOne({ apiKey: key });
  };
};
