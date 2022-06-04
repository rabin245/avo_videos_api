const mysql = require("mysql2");

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sqlp@ssw0rd",
  database: "video_db",
});

module.exports = connection;
