const express = require("express");
const router = express.Router();
const BookModel = require("../models/book");

router.get("/", async function (req, res) {
  try {
    const books = await BookModel.find({});
    console.log("Books:", books);
    res.render("books/index", { books });
  } catch (err) {
    console.log("Error getting books:", err);
    res.status(500).send("Error getting books");
  }
});

router.get("/new", function (req, res) {
  res.render("books/new");
});

router.post("/", async function (req, res) {
  try {
    const newBook = new BookModel({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      createdBy: req.session.user._id,
    });
    await newBook.save();
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating a new book");
  }
});

router.get("/:id", async function(req, res) {
  try {
    console.log("Fetching book with ID:", req.params.id); // Log the book ID
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("books/show", { book, user: req.session.user });
  } catch (err) {
    console.log(err); // Log the error for debugging
    res.status(400).send("Error loading book");
  }
});

router.get("/:id/edit", async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.id);
    res.render("books/edit", { book });
  } catch (err) {
    console.log(err);
    res.status(404).send("Book not found");
  }
});

router.put("/:id", async function (req, res) {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
    });
    res.redirect(`/books/${updatedBook._id}`);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error updating book");
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book.createdBy.equals(req.session.user._id)) {
      await BookModel.findByIdAndDelete(req.params.id);
      res.redirect("/books");
    } else {
      res.status(403).send("You do not have permission to delete this book.");
    }
  } catch (err) {
    console.log("Error deleting book:", err);
    res.status(500).send("Error deleting book");
  }
});

module.exports = router;
