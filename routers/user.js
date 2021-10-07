const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcrypt");

//model imports
const User = require("../models").user;

//middleware import
const AuthMiddleware = require("../auth/middleware");

// get all users
router.get("/", AuthMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// POST a new user i.e. New User Signup
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("Email, Password and Full Name required");
    } else {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
