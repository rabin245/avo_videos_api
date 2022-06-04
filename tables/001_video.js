const con = require("../startup/db");

const sql = `CREATE TABLE IF NOT EXISTS videos (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT ,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
    );`;

module.exports = async () => {
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table videos created");
  });
};
