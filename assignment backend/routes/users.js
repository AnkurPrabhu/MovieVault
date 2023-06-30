const express = require("express");
const router = express.Router();

const { getAllUsers, addUser, login } = require("../controller/users");

router.get("/users", getAllUsers);

router.post("/add_Users", addUser);

router.post("/login", login);

module.exports = router;
