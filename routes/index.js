const routes = require("express").Router();
let db = require("../DbConnection/dbconfig");

routes.get("/", (req, res) => {
  console.log(db.name);
  db.name = "Pedro";
  console.log(db.name);
  res.status(200).send("News");
});

routes.get("/news", require("./news"));

module.exports = routes;
