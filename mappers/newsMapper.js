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
      const query = this.queryBuilder(formatted); // build the query
      const tmp = pool.query(query, (error, results, fields) => {
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

  // To format the raw json data from the frontend to help build the query
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
    if (result.latestNews === false && data.newsPeriod !== undefined) {
      result.newsStartTime = data.newsPeriod.startTime;
      result.newsEndTime = data.newsPeriod.endTime;
    }
    if (data.allSources === false && data.sources !== undefined) {
      result.sources = data.sources;
    }
    return result;
  }

  queryBuilder(data) {
    // Decide which table shoule be read to get the info according to the area name
    const areaName = data.areaName;
    const locationTable = "storyLocation_" + areaName + "_yt";
    const plainTable = "storyPlain_" + areaName + "_yt";
    // Build the raw query
    let sql =
      "SELECT l.title, l.location, s.sourceName , p.lastUpdated, l.latitude, l.longitude, l.url FROM " +
      plainTable +
      " p " +
      "INNER JOIN " +
      locationTable +
      " l ON l.idArticle = p.id " +
      "INNER JOIN sources s ON s.id = p.source";
    console.log("raw query: ", sql);

    // generate the WHERE condition
    let whereCondition = " WHERE";
    let sources = "";
    let period = "";

    // News sources selections
    if (data.sources !== undefined) {
      console.log("source: ", data.sources.length);
      for (let i = 0; i < data.sources.length; i++) {
        let source = " '" + data.sources[i] + "'";
        sources = sources + " OR s.sourceName =" + source;
      }
      sources = sources.substring(4);
      sources = " (" + sources + ")";
      console.log(sources);
      whereCondition += sources;
    }

    // News period selections
    if (
      data.latestNews === false &&
      data.newsStartTime !== undefined &&
      data.newsEndTime !== undefined
    ) {
      if (sources != "") period += " AND";
      period +=
        " DATE_FORMAT(p.lastUpdated, '%Y-%m-%d %H:%i:%s') >= '" +
        data.newsStartTime +
        "' AND DATE_FORMAT(p.lastUpdated, '%Y-%m-%d %H:%i:%s') <= '" +
        data.newsEndTime +
        "'";
      console.log("period: " + period);
      whereCondition += period;
    }
    console.log("whereCondition: ", whereCondition);

    // if no sources or period selection, skip the "WHERE" keyword
    if (sources != "" || period != "") {
      sql += whereCondition;
      console.log("sql: ", sql);
    }

    // Result order
    const order = " ORDER BY p.lastUpdated DESC";

    // limit of rows in the result
    const limit = " LIMIT " + data.maxNewsQuantity;
    console.log("Limit:", limit);

    // Final query
    sql = sql + order + limit;
    console.log("Final query: ", sql);

    return sql;
  }
}

module.exports = NewsMapper;
