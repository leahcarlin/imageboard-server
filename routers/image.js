const { Router } = require("express");
const router = new Router();

//model imports
const Image = require("../models").image;

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
  } catch (e) {
    next(e);
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

module.exports = router;
