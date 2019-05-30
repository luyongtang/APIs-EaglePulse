const mysql = require("mysql");
const dbConnector = require("../DbConnection/dbconfig");
const db = require("../DbConnection/db");

const pool = db.getPool();

class NewsMapper {
  constructor() {
    this.pool = pool;
  }

  fetchNews(data, callback) {
    let result = {};
    let formatted = this.dataFormatter(data);
    if (
      formatted.areaName === undefined ||
      typeof formatted.areaName !== "string"
    ) {
      console.log(formatted.areaName);
      result.status = 400;
      result.err = "The field of areaName is required and it is type of String";
      result.msg = "";
      result.data = {};
      callback(result);
    } else {
      const areaName = formatted.areaName;
      const table = "storyLocation_" + areaName + "_yt";
      // const sql = "SELECT * FROM " + table;
      // const sql = "SELECT * FROM ??";
      let sql =
        "select l.title, l.location, s.sourceName , p.lastUpdated, l.latitude, l.longitude, l.url from storyPlain_montreal_yt p " +
        "inner join storyLocation_montreal_yt l on l.idArticle = p.id " +
        "inner join sources s on s.id = p.source";
      const tmp = pool.query(sql, (error, results, fields) => {
        if (error) {
          console.log("error", error.message);
          result.status = 404;
          result.err = error.message;
          result.msg = "";
          result.data = {};
        } else {
          console.log("success");
          result.status = 200;
          result.err = "";
          result.msg = "";
          result.data = results;
        }
        callback(result);
      });
    }
  }

  dataFormatter(data) {
    let result = {};
    result.areaName =
      data.areaName === undefined || typeof data.areaName !== "string"
        ? undefined
        : data.areaName.toLowerCase();
    result.latestNews = data.latestNews === undefined ? true : data.latestNews;
    result.allSources = data.allSources === undefined ? true : data.allSources;
    result.maxNewsQuantity =
      data.maxNewsQuantity === undefined ? 15 : data.maxNewsQuantity;
    if (result.latestNews === false || data.newsPeriod !== undefined) {
      result.newsStartTime = data.newsPeriod.startTime;
      result.newsEndTime = data.newsPeriod.endTime;
    }
    if (data.allSources === false && data.sources !== undefined) {
      result.sources = data.sources;
    }
    return result;
  }
}

module.exports = NewsMapper;
