const users = require("../model/users");

exports.getAllUsers = async (req, res, next) => {
  try {
    const allusers = await users.fetchall();
    res.status(200).json(allusers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const allusers = await users.addUser(username, password, email);

    res.status(200).json({ Success: "succesfully added user" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { password, username } = req.body;

  try {
    const getuser = await users.login(username, password);
    res
      .status(200)
      .json({ Success: "succesfully logged in user", id: getuser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }
    next(err);
  }
};
