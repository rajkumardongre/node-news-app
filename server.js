const path = require("path");
const https = require("https")

const express = require("express");
const hbs = require("hbs");


const app = express();
const port = process.env.PORT || 8000;

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
  const userAgent = req.get('user-agent');
  const options = {
      host: 'newsapi.org',
      path: '/v2/top-headlines?page=1&pageSize=100&country=in&apiKey=1038dc78bdbb49d29e2c9d8d7df13303',
      headers: {
          'User-Agent': userAgent
      }
  }
  https.get(options, function (response) {
      let data;
      response.on('data', function (chunk) {
          if (!data) {
              data = chunk;
          }
          else {
              data += chunk;
          }
      });
      response.on('end', function () {
          const newsData = JSON.parse(data);
          // console.log(newsData);
          res.send(newsData)
      });
  });
});

app.listen(port, () => {
  console.log(`Listening to the port ${port}...`);
});
