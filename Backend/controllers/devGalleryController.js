const multer = require("multer");
const path = require("path");
const { DevGalleryItem } = require("../models/index");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Middleware for file upload
exports.uploadImage = upload.single("file");

// Handler for file upload
exports.handleUpload = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const newItem = await DevGalleryItem.create({
      title,
      description,
      imageUrl,
    });

    res.status(201).send(newItem);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send(error.message);
  }
};

// Handler for retrieving gallery items
exports.getGalleryItems = async (req, res) => {
  try {
    const items = await DevGalleryItem.findAll();
    res.status(200).send(items);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).send(error.message);
  }
};
