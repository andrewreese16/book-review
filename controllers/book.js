const express = require("express");
const router = express.Router();
const BookModel = require("../models/book");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", async function (req, res) {
  try {
    let query = {};
    if (req.query.type && req.query.type !== "All") {
      query.type = req.query.type;
    }
    if (req.query.q) {
      query.$or = [
        { title: { $regex: req.query.q, $options: "i" } },
        { author: { $regex: req.query.q, $options: "i" } },
        { description: { $regex: req.query.q, $options: "i" } },
      ];
    }
    const books = await BookModel.find(query);
    const types = await BookModel.distinct("type");
    res.render("books/index", {
      books,
      types,
      selectedType: req.query.type || "All",
      searchQuery: req.query.q || "",
    });
  } catch (err) {
    res.status(500).send("Error getting books");
  }
});

router.get("/new", isLoggedIn, function (req, res) {
  res.render("books/new");
});

router.post("/", isLoggedIn, async function (req, res) {
  try {
    const newBook = new BookModel({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      type: req.body.type,
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

router.get("/:id/edit", isLoggedIn, async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book.createdBy.equals(req.session.user._id)) {
      res.render("books/edit", { book });
    } else {
      res.status(403).send("You do not have permission to edit this book.");
    }
  } catch (err) {
    res.status(404).send("Book not found");
  }
});

router.put("/:id", isLoggedIn, async function (req, res) {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book.createdBy.equals(req.session.user._id)) {
      const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        type: req.body.type,
      });
      res.redirect(`/books/${updatedBook._id}`);
    } else {
      res.status(403).send("You do not have permission to update this book.");
    }
  } catch (err) {
    res.status(400).send("Error updating book");
  }
});

router.delete("/:id", isLoggedIn, async function (req, res) {
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
