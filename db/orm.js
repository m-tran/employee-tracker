const connection = require("./connection");

const orm = {
  findAllEmployees: function() {
    return connection.query(
      "SELECT e.id, e.first_name, e.last_name, e.manager_id, r.title, r.salary FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id;"
      );
  },
}

module.exports = orm;
