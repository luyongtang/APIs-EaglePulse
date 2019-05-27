const dbConnector = require("../DbConnection/dbconfig");
const db = require("../DbConnection/db");

const pool = db.getPool();

class NewsMapper {
  constructor() {
    this.pool = pool;
  }

  fetchNews(data, callback) {
    let result = {};
    if (!data.city) {
      result.status = 400;
      result.err = "The field of city is required";
      result.msg = null;
      result.data = null;
      callback(result);
    } else {
      const city = data.city;
      const table = "storyLocation_" + city + "_yt";
      const sql = "SELECT * FROM storyLocation_montreal_yt";
      pool.query(sql, (error, results, fields) => {
        if (error) {
          console.log("error", error);
          result.status = 404;
          result.err = "Query error";
          result.msg = null;
          result.data = null;
        } else {
          console.log("success");
          result.status = 200;
          result.err = null;
          result.msg = null;
          result.data = results;
        }
        callback(result);
      });
    }
  }
}

module.exports = NewsMapper;
