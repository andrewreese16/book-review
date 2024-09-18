const express = require("express");
const router = express.Router();
const BookModel = require("../models/book");

router.get("/search", async function (req, res) {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.redirect("/books");
    }
    const books = await BookModel.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { author: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    });
    res.render("books/index", { books, searchQuery });
  } catch (err) {
    res.status(500).send("Error searching for books");
  }
});

router.get("/", async function (req, res) {
  try {
    const books = await BookModel.find({});
    res.render("books/index", { books });
  } catch (err) {
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
    res.status(500).send("Error creating a new book");
  }
});

router.get("/:id", async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("books/show", { book, user: req.session.user });
  } catch (err) {
    res.status(400).send("Error loading book");
  }
});

router.get("/:id/edit", async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.id);
    res.render("books/edit", { book });
  } catch (err) {
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
    res.status(500).send("Error deleting book");
  }
});

module.exports = router;
