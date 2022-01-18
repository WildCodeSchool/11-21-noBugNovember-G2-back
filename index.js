const cors = require("cors");
const express = require('express');
const morgan = require("morgan");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cheerio = require('cheerio');


const articles = require("./src/routes/articles.js");
const comments = require("./src/routes/comments.js");
const connection = require("./src/helper/db.js");
const favorite = require("./src/routes/favorite.js");
const members = require("./src/routes/members.js");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/articles", articles);
app.use("/comments", comments);
app.use("/favorite", favorite);
app.use("/members", members);

//Récupération des méta-données
app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  if (!req.query.url) return res.json({
    "error": "No url query.",
    "usage": "https://meta.totallyusefulapi.ml/?url=https://google.com"
  })
  fetch(req.query.url)
    .then(result => result.text())
    .then(page => {
      const $ = cheerio.load(page);
      var title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content')
      var description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')
      var url = $('meta[property="og:url"]').attr('content')
      var site_name = $('meta[property="og:site_name"]').attr('content')
      var image = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content')
      var icon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href')
      var keywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content')
      res.json({ title: title, description: description, url: url, site_name: site_name, image: image, icon: icon, keywords: keywords })
    }).catch(err => {
      res.json({
        "error": "Invalid url query.",
        "usage": "https://meta.totallyusefulapi.ml/?url=https://google.com"
      });
    })
});

app.get("/ironman", (rep, res) => {
  res.send("And I am Iron Man '/'")
})

let server = app.listen(3030, () => {
  console.log("listening on port", server.address().port)
})