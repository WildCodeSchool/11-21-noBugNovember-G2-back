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

Router.put("/admin", (req, res) => {
  const sql = "SELECT admin FROM members WHERE id=?";
  const value = [req.body.id];

  connection.query(sql, value, (err, result) => {
    if  (err) throw err;
    return res.status(200).send(result);
  })
})

Router.put("/connect", (req, res) => {
  const sql = "SELECT id,avatar,name,admin FROM members WHERE name=? AND password=?";
  const values = [req.body.name, req.body.password];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
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

Router.get("/avatar/get", (req, res) => {
  const sql = "SELECT avatar FROM members WHERE id=?";
  const values = [req.body.id];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("GET on Members Avatar");
})

Router.post("/avatar/update", (req, res) => {
  const sql = "UPDATE members SET avatar=? WHERE id=?";
  const values = [req.body.avatar, req.body.id];
  
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  })
  console.log("PUT on Members Update Avatar");
})

module.exports = Router;