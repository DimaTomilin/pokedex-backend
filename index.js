const express = require("express");
const POKEDEX = require("pokedex-promise-v2");
const pokedex = new POKEDEX();
const server = express();
const port = 8080;

// starting the server
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

server.get("/", (req, res) => {
  res.send("hello world!");
});
