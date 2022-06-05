const con = require("../startup/db").promise();

module.exports = async function transaction(func) {
  con.beginTransaction();
  try {
    const data = await func(con);
    con.commit();
    return data;
  } catch (error) {
    con.rollback();
    throw error;
  }
};
