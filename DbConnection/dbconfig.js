const mysql = require("mysql");

const mysqlConnection = mysql.createPool({
  host: "sitham.ca",
  user: "sithamca_yl",
  password: "yongtangLu",
  database: "sithamca_pulse"
});

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
