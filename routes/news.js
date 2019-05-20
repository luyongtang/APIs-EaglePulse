const routes = require("express").Router();

routes.get("/news", (req, res) => {
  if (!req.body.city) res.status(400).send("the field of city is required");
  res.send(req.body);
});

module.exports = routes;
