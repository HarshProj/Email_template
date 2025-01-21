const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");
const path=require('path')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors()); // Enable CORS
app.use(express.json()); // JSON parser (No need for bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // To handle form-urlencoded data
app.use(express.static("uploads")); // Serve uploaded images
app.use("/api", emailRoutes); // Use routes for email-related actions

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
