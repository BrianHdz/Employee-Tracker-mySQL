var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "PASSWORD",
    database: "employee_tracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add Department",
                "Add Roles",
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Update Employee Roles"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Roles":
                    addRoles();
                    break;

                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Update Employee Roles":
                    updateRoles();
                    break;
            }
        });
}