const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "sitham.ca",
  user: "sithamca_yl",
  password: "yongtangLu",
  database: "sithamca_pulse"
});

function connect() {
  connection.connect(err => {
    if (err) throw err;
    console.log("Connected!");
  });
}

function close() {
  connection.end();
  console.log("connection is closed!");
}

module.exports.connect = connect;
module.exports.close = close;
