// CodeContentController.js
const axios = require("axios");

const CodeContentController = {
  fetchCodeContent: async (req, res) => {
    const { filePath } = req.query;

    try {
      const githubResponse = await axios.get(
        `https://github.com/victoroyoma/SpatialOpsV2/contents/${filePath}`,
        {
          headers: { Accept: "application/vnd.github.v3.raw" },
        }
      );

      // Optionally, add logic for serving from local storage or database

      res.send(githubResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to fetch code content");
    }
  },
};

module.exports = CodeContentController;
