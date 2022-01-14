const express = require("express");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
})

Router.get("/read", (req, res) => {
  const sql = "SELECT * FROM veille.favorite WHERE id_member=?";
  const value = req.body.id_member;

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
  const sql = "SELECT f.id_article, f.id_member, m.id, m.name, m.avatar, a.id, a.url, a.year, a.week, a.description, a.likes, a.id FROM veille.favorite AS f INNER JOIN veille.articles AS a INNER JOIN veille.members AS m ON f.id_article = a.id AND a.id_users = m.id WHERE f.id_member=?";
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
  const sql = "INSERT INTO veille.favorite (id_article, id_user) VALUES (?,?)";
  const values = [
    req.body.id_article,
    req.body.id_user
  ];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  res.send("POST on favorite/add");
})

Router.delete("/delete", (req, res) => {
  console.log("req BODY",req.body)
  const sql = "DELETE FROM favorite WHERE (`id` = '4');";
  const values = [
    req.body.id_article,
    req.body.id_user
  ];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  res.send("POST on favorite/add");
})

module.exports = Router;