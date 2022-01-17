const express = require("express");
const connection = require("../helper/db.js");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("i am on GET '/' ")
})

Router.get("/read", (req, res) => {
  const sql = "SELECT * FROM veille.members";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Members");
})

Router.get("/read/id", (req, res) => {
  const sql = "SELECT * FROM members WHERE id=?";
  const value = [req.body.id];

  connection.query(sql, value, (err, result) => {
    if  (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Members ID");
})

Router.put("/connect", (req, res) => {
  const sql = "SELECT id,avatar FROM members WHERE name=? AND password=?";
  const values = [req.body.name, req.body.password];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
})

Router.put("/rang", (req, res) => {
  const sql = "UPDATE members SET rang=? WHERE id=?";
  const values = [req.body.rang, req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  })
  console.log("PUT on Members Update Rang");
})

Router.put("/avatar/get", (req, res) => {
  const sql = "SELECT avatar FROM members WHERE id=?";
  const values = [req.body.id];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Members Avatar");
})

Router.put("/avatar/put", (req, res) => {
  const sql = "UPDATE members SET avatar=? WHERE id=?";
  const values = [req.body.avatar, req.body.id];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("PUT on Members Update Avatar");
})

/*
Router.post("/add", (req, res) => {
  console.log("req BODY",req.body)
  const sql = "INSERT INTO `veille`.`articles` (`id_article`, `id_user`) VALUES (?,?)";
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