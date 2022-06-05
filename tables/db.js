const con = require("../startup/db");
const createVideoTable = require("./001_video");
const createVideoListTable = require("./002_video_list");
const alterVideoListTable = require("./003_alter_video_list");

async function createTables() {
  await createVideoTable();
  await createVideoListTable();
  await alterVideoListTable();
}

createTables()
  .then(() => {
    console.log("Tables created successfully");
  })
  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
