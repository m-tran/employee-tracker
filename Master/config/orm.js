const connection = require("./connection");

connection.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

module.exports = {  };