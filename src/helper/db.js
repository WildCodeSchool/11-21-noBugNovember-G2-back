const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "chocochoc",
  database: "veille"
})

connection.connect(err => {
  if (err) throw err;
  console.log("Connecté à MySQL");
})

module.exports = connection;