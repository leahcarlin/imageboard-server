const { Router } = require("express");
const router = new Router();


//model imports
const Image = require("../models").image;

//middleware import
const AuthMiddleware = require("../auth/middleware");

// GET all images
router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.send(images);
  } catch (e) {
    next(e);
  }
});

// POST a new image
router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send("Image title and url required");
    } else {
      const newImage = await Image.create(req.body);
      res.send(newImage);
    
  }
});

// GET one image
router.get("/:id", async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const singleImage = await Image.findByPk(imageId);
    if (!singleImage) {
      res.status(404).send("Image not found");
    } else {
      res.send(singleImage);
    }
  } catch (e) {
    next(e);
  }
});

// Add a protection to images
// router.get("/auth/messy", async (req, res, next) => {
//   const auth =
//     req.headers.authorization && req.headers.authorization.split(" ");
//   if (auth && auth[0] === "Bearer" && auth[1]) {
//     try {
//       const data = toData(auth[1]);
//       const allImages = await Image.findAll();
//       res.json(allImages);
//     } catch (e) {
//       //   console.log(e);
//       res.status(400).send("Invalid JWT token");
//     }
//   } else {
//     res.status(401).send({
//       message: "Please supply some valid credentials",
//     });
//   }
// });

module.exports = router;
