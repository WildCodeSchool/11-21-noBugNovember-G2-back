const express = require("express");
const { send } = require("express/lib/response");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
})

Router.get("/read", (req, res) => {
  const sql = "SELECT * FROM veille.articles";
  
  connection.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles/Read");
})

Router.get("/read/all", (req, res) => {
  
  const sql1 = "SELECT * FROM articles";
  const sql2 = "SELECT id,name,avatar FROM members";

  let articles;
  let members;

  connection.query(
    "SELECT m.id, m.name, m.avatar, a.url, a.year, a.week, a.description, a.likes, a.id FROM veille.members AS m INNER JOIN veille.articles AS a ON m.id = a.id_users ORDER BY a.id desc", 
    (err, result) => {
    if (err) throw err;
    else {
      console.log(result)
      return res.status(200).send(result);
    }
    })
})

Router.get("/read/id", (req, res) => {
  const sql = "SELECT * FROM veille.articles WHERE id=?";
  const value = [req.body.id];

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles ID");
})

Router.get("/search/desc", (req,res) => {
  const sql = "SELECT a.id, a. FROM articles AS a WHERE description LIKE ?";
  const value = '%'+req.body.desc+'%';

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles Search Desc");
})

Router.get("/search/date", (req, res) => {
  const sql = "SELECT * FROM veille.articles WHERE year=? AND week=?";
  const values = [req.body.year, req.body.week]
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles Search Date");
})

Router.get("/likes", (req, res) => {
  const sql = "UPDATE veille.articles SET likes=? WHERE id=?";
  const values = [req.body.likes, req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles Update Likes");
})

Router.post("/add", (req, res) => {
  console.log("req BODY",req.body)

  const sql = "INSERT INTO veille.articles (`week`, `year`, `id_users`, `url`, `description`) VALUES (?,?,?,?,?)";
  const values = [
    req.body.week,
    req.body.year,
    req.body.id_users,
    req.body.url,
    req.body.description
  ]
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("POST '/articles/add'")
})

module.exports = Router;