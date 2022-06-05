const express = require("express");
const app = express();

app.use(express.json());
require("./startup/routes")(app);

// Error Handler
app.use(function (err, req, res, next) {
  console.error(err);
  const statusCode = err.message == "Video not found" ? 404 : 500;

  res
    .status(statusCode)
    .json({ Error: "Something broke!", message: err.message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
