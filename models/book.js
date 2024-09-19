const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    required: true,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Mystery",
      "Science Fiction",
      "Fantasy",
      "Biography",
      "Novel",
      "Short Story",
      "Poem",
      "Other",
    ],
  },
  review: [reviewSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
