const express = require("express");
const multer = require("multer");
const path = require("path");
const EmailTemplate = require("../models/EmailTemplate");

const router = express.Router();

// Setup for handling image uploads using multer
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get the email layout HTML file
router.get("/getEmailLayout", (req, res) => {
  const layoutPath = path.join(__dirname, "../public/layout.html");
  res.sendFile(layoutPath);
});

// Handle image uploads
router.post("/uploadImage", upload.single("image"), (req, res) => {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.json({ imageUrl });
});

// Save the email template configuration
router.post("/uploadEmailConfig", async (req, res) => {
  const { title, content, footer, imageUrl } = req.body;

  try {
    const emailTemplate = new EmailTemplate({ title, content, footer, imageUrl });
    await emailTemplate.save();
    res.status(201).json({ message: "Email template saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save email template" });
  }
});

// Render the email template and download
router.post("/renderAndDownloadTemplate", async (req, res) => {
  try {
    const { title, content, footer, imageUrl } = req.body;

    // Create a function to render the template
    const renderedTemplate = `
      <html>
        <body>
          <h1>${title}</h1>
          <div>${content}</div>
          <footer>${footer}</footer>
          ${imageUrl ? `<img src="${imageUrl}" alt="Image" />` : ""}
        </body>
      </html>
    `;

    res.status(200).send(renderedTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
