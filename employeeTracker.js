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

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the employee's role?",
                choices: [
                    "Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Account Manager",
                    "Accountant",
                    "Legal Team Lead"
                ]
            },
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO employee_tracker_DB.employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    runSearch()
                }
            )
        })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "dept",
            type: "rawlist",
            message: "What department will we assign an ID to?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]  
        },
        {
            name: "deptID",
            type: "input",
            message: "What will the ID be?" 
        },
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO employee_tracker_DB.department SET ?",
            {
                name: answer.dept,
                id: answer.deptID
            },
            function (err) {
                if (err) throw err;
                console.log("Your department was created successfully!");
                runSearch()
            }
        )
    })
}

function addRoles() {
    inquirer.prompt([
        {
            name: "roleTitle",
            type: "rawlist",
            message: "What role will we create?",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]  
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What will the salary be?" 
        },
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO employee_tracker_DB.role SET ?",
            {
                
                title: answer.roleTitle,
                salary: answer.roleSalary
                
            },
            function (err) {
                if (err) throw err;
                console.log("New role was created successfully!");
                runSearch()
            }
        )
    })
}



function viewEmployees() {
    
        connection.query(
            "INSERT INTO employee_tracker_DB.role SET ?",
            {
                
                title: answer.roleTitle,
                salary: answer.roleSalary
                
            },
            function (err) {
                if (err) throw err;
                console.log("New role was created successfully!");
                runSearch()
            }
        )
}



/*
viewDepartments()
viewRoles()
updateRoles()
*/
