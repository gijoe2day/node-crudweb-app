const express = require("express");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

const app = express();

//connect mongodb
const dbURI =
  "mongodb+srv://test_uster:test1234@clustertest.mcrtr.mongodb.net/ClusterTes?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// view engines
app.set("view engine", "ejs");

// midleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//about route
app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/blogs", blogRoutes);

//404 route
app.use((req, res) => {
  res.status(404).render("404");
});
