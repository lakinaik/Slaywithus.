const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  imageUrl: String,
  title: String,
  category: String,
  admin: String,
  date: String,
  fullblog: String,
});

const Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;
