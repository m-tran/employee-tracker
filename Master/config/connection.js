const mysql = require("mysql");

let connection;

connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "tracker_db",
});

module.exports = connection;