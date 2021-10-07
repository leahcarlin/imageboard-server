const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const router = new Router();

//model imports
const User = require("../models").user;

//middleware import
const AuthMiddleware = require("../auth/middleware");

//user trying to login - check if password is same as token
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || email === "") {
      res.status(400).send({ message: "Valid email and password required" });
    } else if (!password || password === "") {
      res.status(400).send({ message: "Valid email and password required" });
    } else {
      // 1. find user based on email address
      const auth_user = await User.findAll({ where: { email: email } });
      if (!auth_user) {
        res.status(400).send({ message: "Email or Password was incorrect" });
      }
      // 2. use bcrypt.compareSync to check the received password against the stored hash
      //   console.log(password);
      //   console.log(auth_user[0].password);
      else if (bcrypt.compareSync(password, auth_user[0].password)) {
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        console.log(auth_user[0].id);
        const jwt = toJWT({ userId: auth_user[0].id });
        res.send({
          jwt,
        });
      } else {
        res.status(400).send({ message: "Email or Password was incorrect" });
      }
    }
  } catch (e) {
    next(e);
  }
});

//use middleware anywhere in app if included
router.get("/test-auth", AuthMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

module.exports = router;
