const express = require("express");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
})

Router.get("/read", (req, res) => {
  const sql = "SELECT * FROM veille.favorite WHERE id_user=?";
  const value = req.body.id_user;

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on fvorite/read/user");
})

Router.get("/read/favorites", (req, res) => {
  const sql = "SELECT * FROM veille.favorite WHERE id_article=?";
  const value = [req.body.id_article];

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Favorite");
})

Router.put("/bookmark", (req, res) => {
  console.log("req BODY",req.body)
  const sql = "SELECT f.id_article, f.id_user, m.id, m.name, m.avatar, a.id, a.url, a.year, a.week, a.description, a.likes, a.id FROM favorite AS f INNER JOIN articles AS a INNER JOIN members AS m ON f.id_article = a.id AND a.id_users = m.id WHERE f.id_user=?";
  const values = [
    req.body.id_user
  ];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  //res.send("POST on favorite/add");
})

Router.post("/add", (req, res) => {
  console.log("req BODY",req.body)
  const sql = "INSERT INTO favorite (id_article, id_user) VALUES (?,?)";
  const values = [
    req.body.id_article,
    req.body.id_user
  ];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200);
  })
  res.send("POST on favorite/add");
})

Router.delete("/delete", (req, res) => {
  console.log("req BODY",req.body.id)
  const sql = "DELETE FROM favorite WHERE id=?";
  const values = [
    req.body.id
  ];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200);
  })
  res.send("DELETE on favorite");
})

Router.put("/getid", (req, res) => {
  const sql = "SELECT id FROM favorite WHERE id_user=? AND id_article=?";
  const value = [
    req.body.id_user,
    req.body.id_article  
  ];

  console.log(value)

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
})

module.exports = Router;