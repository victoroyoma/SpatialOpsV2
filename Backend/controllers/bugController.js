const fs = require("fs");
const path = require("path");
const { DevGalleryItem, Task } = require("../models");

exports.createBugReport = async (req, res) => {
  try {
    // Assume the screenshot is sent as a base64 string in the request body
    const { screenshotBase64, description } = req.body;

    // Save the screenshot to DevGallery
    const screenshot = await DevGalleryItem.create({
      imageUrl: screenshotBase64, // You might need to handle base64 to image conversion
      title: "Bug Screenshot",
      description: "Screenshot for bug report",
    });

    // Function to convert base64 string to an image file
    const saveBase64Image = (base64String, outputPath) => {
      return new Promise((resolve, reject) => {
        // Split the base64 string to get the content type and the data
        const matches = base64String.match(
          /^data:([A-Za-z-+\/]+);base64,(.+)$/
        );
        if (!matches || matches.length !== 3) {
          return reject(new Error("Invalid base64 string"));
        }

        const imageBuffer = Buffer.from(matches[2], "base64");
        fs.writeFile(outputPath, imageBuffer, (err) => {
          if (err) {
            return reject(err);
          }
          resolve(outputPath);
        });
      });
    };

    // Assuming you have an endpoint to handle bug report submission
    exports.createBugReport = async (req, res) => {
      try {
        const { screenshotBase64, description } = req.body;

        // Define the path where you want to save the image
        const imagePath = path.join(
          __dirname,
          "../uploads",
          `bug-${Date.now()}.png`
        );

        // Save the base64 string as an image file
        await saveBase64Image(screenshotBase64, imagePath);

        // Here, instead of saving the base64 string in your database,
        // save the URL/path to the saved image file
        const screenshotUrl = `/uploads/${path.basename(imagePath)}`;

        // Proceed to create the bug report task with the screenshotUrl
        // ...
      } catch (error) {
        console.error("Error creating bug report:", error);
        res.status(500).send("Internal Server Error");
      }
    };

    // Create a new task for the bug report
    const bugReportTask = await Task.create({
      title: "Bug Report",
      description,
      isBug: true,
      screenshotUrl: screenshot.imageUrl, // Use the URL from the saved DevGallery item
      // Set other necessary fields, like status, priority, etc.
    });

    res.status(201).json(bugReportTask);
  } catch (error) {
    console.error("Error creating bug report:", error);
    res.status(500).send("Internal Server Error");
  }
};
