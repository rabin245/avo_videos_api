const con = require("../startup/db");

const sql = `CREATE TABLE IF NOT EXISTS video_list (
    list_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    video_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
    );`;

module.exports = async () => {
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table video list created");
  });
};
