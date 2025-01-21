const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema({
  title: String,
  content: String,
  footer: String,
  imageUrl: String,
});

module.exports = mongoose.model("EmailTemplate", EmailTemplateSchema);
