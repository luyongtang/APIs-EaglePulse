const routes = require("express").Router();
let db = require("../DbConnection/dbconfig");

routes.get("/news", (req, res) => {
  console.log(db.name);
  if (!req.body.city)
    res.status(400).json({ err: "the field of city is required" });
  else {
    const sql = "SELECT * FROM storyLocation_montreal_yt";
    db.runQuery(sql, results => {
      res.status(200).json({ data: results });
    });
  }
});

module.exports = routes;
