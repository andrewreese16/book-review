const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");

app.set("view engine", "ejs");

const authController = require("./controllers/auth.js");
const bookController = require("./controllers/book.js");
const reviewController = require("./controllers/review.js");

const passUsertoView = require("./middleware/pass-user-to-view.js");
const isLoggedIn = require("./middleware/isLoggedIn.js");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUsertoView);


app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.use("/auth", authController);
app.use(isLoggedIn);
app.use("/books", bookController);
app.use("/books/:bookId/reviews", reviewController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
