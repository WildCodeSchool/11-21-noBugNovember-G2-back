const express = require("express");
// const { send } = require("express/lib/response");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
})

Router.get("/read", (req, res) => {
  const sql = "SELECT * FROM veille.articles";
  
  connection.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).json(result);
  })
  console.log("GET on Articles/Read");
})

Router.post("/byuser", (req, res) => {
  console.log(req.body)
  const sql = "SELECT id,week,year,url,description FROM articles WHERE id_users=? ORDER by id desc";
  const value = [req.body.id_users];

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    return res.status(200).json(result);
  })
  console.log("POST on Articles/ByUser");
})

Router.get("/read/all", (req, res) => {
  connection.query(
    "SELECT m.id, m.name, m.avatar, a.url, a.year, a.week, a.description, a.likes, a.id FROM veille.members AS m INNER JOIN veille.articles AS a ON m.id = a.id_users ORDER BY a.id desc", 
    (err, result) => {
    if (err) throw err;
    else {
      return res.status(200).send(result);
    }
    })
})

Router.get("/godmode/read", (req, res) => {
  connection.query(
    "SELECT m.id, m.name, a.url, a.year, a.week, a.description, a.id FROM members AS m INNER JOIN articles AS a ON m.id = a.id_users ORDER BY a.id desc", 
    (err, result) => {
    if (err) throw err;
    else {
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
  const sql = "SELECT m.id, m.name, m.avatar, a.url, a.year, a.week, a.description, a.likes, a.id FROM members AS m INNER JOIN articles AS a ON m.id = a.id_users WHERE description LIKE ?";
  const value = '%'+req.body.desc+'%';

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles Search Desc");
})

Router.put("/search/date", (req, res) => {
  const sql = "SELECT m.id, m.name, m.avatar, a.url, a.year, a.week, a.description, a.likes, a.id FROM veille.members AS m INNER JOIN veille.articles AS a ON m.id = a.id_users WHERE year=? AND week=? ORDER BY m.name";
  const values = [req.body.year, req.body.week]
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles Search Date");
})

Router.put("/likes", (req, res) => {
  const sql = "UPDATE articles SET likes=likes+1 WHERE id=?";
  const values = [req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Articles Update Likes");
})

Router.post("/add", (req, res) => {
  const sql = "INSERT INTO articles (`week`, `year`, `id_users`, `url`, `description`, `likes`) VALUES (?,?,?,?,?,?)";
  const values = [
    req.body.week,
    req.body.year,
    req.body.id_users,
    req.body.url,
    req.body.description,
    req.body.likes
  ]
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("POST '/articles/add'")
})

Router.delete("/delete", (req, res) => {
  console.log("req BODY",req.body)

  const sql = "DELETE FROM articles WHERE id=?";
  const values = [
    req.body.id
  ]
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("DELETE '/articles/delete'")
})

module.exports = Router;