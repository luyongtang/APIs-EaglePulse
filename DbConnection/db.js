const mysql = require("mysql");
const settings = require("./config.json");
let pool;

function connect(params) {
  if (!pool) pool = mysql.createPool(settings);
  return pool;
}

module.exports.getPool = connect;
