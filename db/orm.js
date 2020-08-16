const connection = require("./connection");

const orm = {
  all: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";

    connection.query(queryString, function(err, result) {
      if (err) { throw err; }
      cb(result);
    });
  },

  add: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, function(err, result) {
      if (err) { throw err; }
      cb(result);
    });
  },
  
  update: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) { throw err; }
      cb(result);
    });
  }
}

module.exports = orm;
