const orm = require("../db/orm");

const employees = {
    all: function(cb) {
        orm.all("employee", function(res) {
            cb(res);
        });
    },
    add: function(cols, vals, cb) {
        orm.add("employee", cols, vals, function(res) {
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("employee", objColVals, condition, function(res) {
            cb(res);
        });
    },
};

module.exports = employees;
