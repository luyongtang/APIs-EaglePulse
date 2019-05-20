const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.status(200).send("News");
});

routes.get("/news", require("./news"));

module.exports = routes;
