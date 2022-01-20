const express = require("express");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
})

Router.post("/isliked", (req, res) => {
  const sql = "SELECT EXISTS (SELECT * FROM veille.likes WHERE id_article IN ( ? ) AND id_user IN (?)) as isLiked"
  const values = [
    req.body.id_article,
    req.body.id_user
  ];

  connection.query(sql, values, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
  console.log("GET on like/isliked")
})

Router.post("/add", (req, res) => {
  console.log("req BODY",req.body)
  const sql = "INSERT INTO likes (id_article,id_user) VALUES (?,?)";
  const values = [
    req.body.id_article,
    req.body.id_user
  ];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200);
  })
  res.send("POST on like/add");
})

module.exports = Router;