const express = require("express");
const { getUser, addUser } = require("../controllers/userController");

const router = express.Router();

router.get("/users/:id", getUser);

module.exports = router;
