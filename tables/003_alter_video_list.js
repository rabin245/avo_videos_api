const con = require("../startup/db");

const sql = `ALTER TABLE video_list
 ADD CONSTRAINT video_list_unique 
 UNIQUE( video_id , name );`;

module.exports = async () => {
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table video list altered");
  });
};
