const express = require("express");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
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