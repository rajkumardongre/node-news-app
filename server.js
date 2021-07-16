const path = require("path");

const express = require("express");
const hbs = require("hbs");

const newsData = require(`${__dirname}/newsData`);

const app = express();

// Paths setup
const publicDirPath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

app.use(express.static(publicDirPath));

// Handelbars setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Defining router
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/api", (req, res) => {
  newsData(1, (data) => {
    res.send(data);
    console.log("==============");
  });
});

app.listen(8000, () => {
  console.log("Listening to the port 8000...");
});
