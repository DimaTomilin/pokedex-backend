const express = require("express");
const router = express.Router();
const fs = require("fs");

router.put("/create/:username", (request, response) => {
  const userName = request.params.username;
  const dir = `./users/${userName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  response.send("hi");
  response.end();
});

module.exports = router;
