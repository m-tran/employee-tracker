const inquirer = require('inquirer');
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
        {
            name: "Quit Tracker",
            value: "quit",
        }
    ],
}];

loadPrompts();

function loadPrompts() {
    inquirer
    .prompt(choices)
    .then((answers) => {
        const choice = answers.choice;
        return choice;
    })
    .then((choice) => {
        return (choice == "viewDepartments") ? viewDepartments()
                : (choice == "viewRoles") ? viewRoles()
                : (choice == "viewEmployees") ? viewEmployees()
                : (choice == "addDepartment") ? addDepartment()
                : (choice == "addRole") ? addRole()
                : (choice == "addEmployee") ? addEmployee()
                : (choice == "updateEmployeeRole") ? updateEmployeeRole()
                : quit();
    });
}

async function viewEmployees() {
    const employees = await orm.findAllEmployees();
    console.table(employees);
    loadPrompts();
}

async function viewDepartments() {
    const departments = await orm.findAllDepartments();
    console.table(departments);
    loadPrompts();
}

async function viewRoles() {
    const roles = await orm.findAllRoles();
    console.table(roles);
    loadPrompts();
}

async function addEmployee() {

    const roles = await orm.findAllRoles();

    const employees = await orm.findAllEmployees();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const employee = await [
        {
            type: "input", 
            name: "first", 
            message: "What's their first name?",
        },
        {
            type: "input", 
            name: "last",
            message: "What's their last name?",
        },
        {
            type: "list", 
            name: "title",
            message: "What's their role?",
            choices: roleChoices,
        },
        {
            type: "list", 
            name: "manager",
            message: "Who's their manager? Leave blank if they don't have one.",
            choices: managerChoices,
            default: function() {
                return null;
            }
        }
    ];

    console.log(employees);

    inquirer
    .prompt(employee)
    .then(async (answers) => {

        console.table(employees);

        const addEmployee = await orm.addAnEmployee({first_name: answers.first, last_name: answers.last, role_id: answers.title, manager_id: answers.manager});

        console.table(addEmployee);
        loadPrompts();
    });
}

async function addDepartment() {
    inquirer
    .prompt([{
        type: "input",
        name: "department",
        message: "What is the name of the new department?",
    }])
    .then(async (answer) => {
        console.log(answer.department);
        const department = await orm.addADepartment(answer.department);
        console.table(department);
        loadPrompts();
    });
}

async function addRole() {
    const department = await orm.findAllDepartments();

    const departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    inquirer
    .prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the new role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the annual salary?",
        },
        {
            type: "list",
            name: "department",
            message: "What department does it belong to?",
            choices: departmentChoices,
        }
    ])
    .then(async (answer) => {
        const role = await orm.addARole({title: answer.role, salary: answer.salary, department_id: answer.department});
        console.table(role);
        loadPrompts();
    });
}

async function updateEmployeeRole() {
    const employees = await orm.findAllEmployees();

    const roles = await orm.findAllRoles();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    inquirer
    .prompt([
        {
            type: "list",
            name: "employee",
            message: "Who would you like to update?",
            choices: employeeChoices,
        },
        {
            type: "list", 
            name: "title",
            message: "What's their role?",
            choices: roleChoices,
        },
    ])
    .then(async (answer) => {
        console.log(employees);
        const role = await orm.updateRole({id: answer.employee, title: answer.title});
        console.table(role);
        loadPrompts();
    });
}

async function quit() {
    process.exit();
}