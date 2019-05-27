const routes = require("express").Router();
const db = require("../DbConnection/dbconfig");
const dbconnect = require("../DbConnection/db");
const NewsMapper = require("../mappers/newsMapper");

const pool = dbconnect.getPool();
const newsMapper = new NewsMapper();

routes.get("/news", (req, res) => {
  console.log(db.name);
  const newsResult = newsMapper.fetchNews(req.body, result => {
    res.status(result.status * 1).json(result);
  });
});

module.exports = routes;
