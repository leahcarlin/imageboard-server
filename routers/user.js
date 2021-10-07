const { Router } = require("express");
const router = new Router();

//model imports
const User = require("../models").user;

// get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// POST a new user
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("Email, Password and Full Name required");
    } else {
      const newUser = await User.create(req.body);
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
