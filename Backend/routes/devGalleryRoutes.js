const express = require("express");
const router = express.Router();
const devGalleryController = require("../controllers/DevGalleryController");

// Route for uploading images
router.post(
  "/upload",
  devGalleryController.uploadImage,
  devGalleryController.handleUpload
);

// Route for retrieving gallery items
router.get("/images", devGalleryController.getGalleryItems);

module.exports = router;
