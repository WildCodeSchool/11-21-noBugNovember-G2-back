const cors = require("cors")
const express = require('express') // <-----------
const morgan = require("morgan") // ----
const fetch = require("node-fetch") 
const bodyParser = require("body-parser")
const cheerio = require('cheerio')
require("dotenv").config()

const articles = require("./src/routes/articles.js");
const comments = require("./src/routes/comments.js");
//const connection = require("./src/helper/db.js");
const favorite = require("./src/routes/favorite.js");
const members = require("./src/routes/members.js");
const like = require("./src/routes/like.js")

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/articles", articles);
app.use("/comments", comments);
app.use("/favorite", favorite);
app.use("/members", members);
app.use("/like", like)

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
      let title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content')
      let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')
      let url = $('meta[property="og:url"]').attr('content')
      let site_name = $('meta[property="og:site_name"]').attr('content')
      let image = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content')
      let icon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href')
      let keywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content')
      res.json({ title: title, description: description, url: url, site_name: site_name, image: image, icon: icon, keywords: keywords })
    }).catch(err => {
      res.json({
        "error": "Invalid url query.",
        "usage": "https://meta.totallyusefulapi.ml/?url=https://google.com"
      });
    })
});


let server = app.listen(3030, () => {
  console.log("listening on port", server.address().port)
})