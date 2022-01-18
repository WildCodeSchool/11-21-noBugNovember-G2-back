const express = require("express");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
})

Router.get("/get", (req, res) => {
  const sql = "SELECT * FROM veille.comments";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles");
})

Router.put("/likes", (req, res) => {
  const sql = "UPDATE comments SET likes=? WHERE id=?";
  const values = [req.body.likes, req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles Update Likes");
})

/*
Router.post("/add", (req, res) => {
  console.log("req BODY",req.body)
  const sql = "INSERT INTO articles (`id_article`, `id_user`) VALUES (?,?)";
  const values = [
    req.body.id_article,
    req.body.id_user
  ]
  
  connection.query(sql, values, (err, result) => {
    if  (err) throw err;
    return res.status(200).send(result);
  })
  // res.send("i am on GET '/recipe/show' ")
})
*/
module.exports = Router;