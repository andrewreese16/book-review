const express = require("express");
const router = express.Router({ mergeParams: true });
const BookModel = require("../models/book");

router.post("/", async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.bookId);
    const newReview = {
      content: req.body.content,
      rating: req.body.rating,
      user: req.session.user._id,
      username: req.session.user.username,
    };
    book.review.push(newReview);
    await book.save();
    res.redirect(`/books/${book._id}`);
  } catch (err) {
    res.status(400).send("Error adding review");
  }
});

router.delete("/:reviewId", async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.bookId);
    const review = book.review.id(req.params.reviewId);
    if (!review) {
      return res.status(404).send("Review not found");
    }
    book.review.pull(review._id);
    await book.save();

    res.redirect(`/books/${book._id}`);
  } catch (err) {
    res.status(400).send("Error deleting review");
  }
});

module.exports = router;
