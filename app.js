const express = require("express");
const app = express();

app.use(express.json());
require("./startup/routes")(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
