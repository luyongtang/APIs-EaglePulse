const mysql = require("mysql");
const settings = require("./config.json");
const mysqlConnection = mysql.createPool(settings);

class DbConnector {
  constructor() {
    this.name = "DbConnector";
    this.runQuery = function(sql, callback) {
      const db = mysqlConnection;
      db.query(sql, (error, results, fields) => {
        if (error) {
          throw error;
        }
        callback(results);
      });
    };
  }
}

const connector = new DbConnector();

module.exports = connector;
