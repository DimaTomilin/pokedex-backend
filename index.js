const express = require("express");
const POKEDEX = require("pokedex-promise-v2");
const { serverError } = require("./src/middleware/errorHandler");
const pokedex = new POKEDEX();
const server = express();
const port = 8080;
const pokemonRouter = require("./src/routers/pokemonRouter");
const userRouter = require("./src/routers/userRouter");

// starting the server
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

server.use("/user", userRouter);
server.use("/pokemon", pokemonRouter);

server.use(serverError);

server.get("/", (req, res) => {
  res.send("hello world!");
});
