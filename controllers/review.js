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
    console.log(err);
    res.status(400).send("Error adding review");
  }
});

router.delete("/:reviewId", async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.bookId);
    console.log("Book found:", book);
    const review = book.review.id(req.params.reviewId);
    console.log("Review found:", review);
    if (!review) {
      console.log("Review not found");
      return res.status(404).send("Review not found");
    }
    book.review.pull(review._id);
    await book.save();

    res.redirect(`/books/${book._id}`);
  } catch (err) {
    console.log("Error deleting review:", err);
    res.status(400).send("Error deleting review");
  }
});

module.exports = router;
