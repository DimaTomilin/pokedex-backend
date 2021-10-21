const express = require("express");
const POKEDEX = require("pokedex-promise-v2");
const pokedex = new POKEDEX();
const server = express();
const port = 8080;
const pokemonRouter = require("./src/routers/pokemonRouter");

// starting the server
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

server.use("/pokemon", pokemonRouter);

server.get("/", (req, res) => {
  res.send("hello world!");
});
