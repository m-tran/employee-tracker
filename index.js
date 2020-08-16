const inquirer = require('inquirer');
// const db = require("./db");
const orm = require ("./db/orm");

const choices = [{
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
        {
            name: "View all departments",
            value: "viewDepartments",
        },
        {
            name: "View all roles",
            value: "viewRoles",
        },
        {
            name: "View all employees",
            value: "viewEmployees"
        },
        {
            name: "Add a department",
            value: "addDepartment",
        },
        {
            name: "Add a role",
            value: "addRole",
        },
        {
            name: "Add an employee",
            value: "addEmployee",
        },
        {
            name: "Update an employee's role",
            value: "updateEmployeeRole",
        },

    ],
}];

loadPrompts();

function loadPrompts() {
    inquirer
    .prompt(choices)
    .then((answers) => {

        const choice = answers.choice;

        return (choice == "viewDepartments") ? viewDepartments()
            : (choice == "viewRoles") ? viewRoles()
            : (choice == "viewEmployees") ? viewEmployees()
            : (choice == "addDepartment") ? addDepartment()
            : (choice == "addRole") ? addRole()
            : (choice == "addEmployee") ? addEmployee()
            : updateEmployeeRole();
    });
}

async function viewEmployees () {
    const employees = await orm.findAllEmployees();

    console.table(employees);

    loadPrompts();
}