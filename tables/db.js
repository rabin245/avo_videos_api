const con = require("../startup/db");
const createVideoTable = require("./001_video");
const createVideoListTable = require("./002_video_list");

async function createTables() {
  await createVideoTable();
  await createVideoListTable();
}

createTables()
  .then(() => {
    console.log("Tables created successfully");
  })
  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
