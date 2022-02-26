const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'
    },
    console.log('Connected to employee_tracker_db database')
);
db.connect(function (err) {
    if (err) throw err;
    Prompts();
});
function Prompts() {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select a category to begin:',
            name: 'action',
            choices: [
                'view all employees',
                'view all roles',
                'view all departments',
                'add employee',
                'add role',
                'add department',
                'update an employee role',
                'exit'
            ]
        }
    ]).then(function (answers) {
        switch (answers.action) {
            case 'view all employees':
                Employees();
                break;

            case 'view all departments':
                Departments();
                break;

            case 'view all roles':
                Roles();
                break;

            case 'add department':
                addDepartment();
                break;

            case 'add role':
                addRole();
                break;

            case 'add employee':
                addEmployee();
                break;

            case 'update an employee role':
                updateRole();
                break;

            case 'Exit Employee Tracker':
                connection.end();
                break;
        }
    })
};
function Employees() {
    const sql = `SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    roles.salary, 
    department.name AS department, 
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager
  FROM employee
  LEFT JOIN roles
    ON employee.role_id = roles.id
  LEFT JOIN department
    ON department.id = roles.department_id
  LEFT JOIN employee managers
    ON managers.id = employee.manager_id`;
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        Prompts()
    });
}
function Departments() {
    const sql = `SELECT * FROM department`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        Prompts()
    });
}
function Roles() {
    const sql = `SELECT * FROM roles`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        Prompts()
    });
}
function addEmployee() {
    
    return inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter the first name of employee.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter the last name of employee.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'Enter the role ID of employee.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'Enter the manager ID of employee.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        }
    ])

        .then(function (res) {
            db.query("INSERT INTO Employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: res.roleId,
                    manager_id: res.managerId
                   
                },
                function (err) {
                    if (err) throw err
                    console.table(res)
                    Prompts();
                });
        });
};
function addDepartment() {
    return inquirer.prompt([
        {
            name: 'ID',
            type: 'input',
            message: 'Enter the ID of the new department',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
        {
            name: 'departmentId',
            type: 'input',
            message: 'Enter the department ID of the new department',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
        {
            name: 'DepartmentName',
            type: 'input',
            message: 'Enter the name of the new department.',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
    ])

        .then(function (res) {
            db.query("INSERT INTO department SET ?",
                {
                    id: res.ID,
                    name: res.DepartmentName,
                },
                function (err) {
                    if (err) throw err
                    console.table(res)
                    Prompts();
                });
        });
};
function addRole() {
    return inquirer.prompt([
        {
            name: 'Title',
            type: 'input',
            message: 'Enter the title of the new role',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
        {
            name: 'Salary',
            type: 'input',
            message: 'Enter the salary of the new role',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
        {
            name: 'departmentId',
            type: 'input',
            message: 'Enter the id of the new role',
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Enter a value to continue..';
            }
        },
    ])

        .then(function (res) {
            db.query("INSERT INTO roles SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                    department_id: res.departmentId

                },
                function (err) {
                    if (err) throw err
                    console.table(res)
                    Prompts();
                });
        });
};
function updateRole() {
    const sql = 'SELECT * FROM employee'
    db.query(sql, (err, res) => {
        if (err) throw err
        const employee = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'title',
                    message: 'Choose the employee you would like to update:',
                    choices: employee
                }
            ])
            .then((answers) => {
                const sql = `SELECT * FROM roles`;
                db.query(sql, (err, res) => {
                    if (err) throw err;
                    const roles = res.map(({ id, title, salary }) => ({
                        value: id,
                        title: `${title}`,
                        salary: `${salary}`,
                        name: `${title}`
                    }));
                    return inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'roles',
                                message: "Choose employee's new role",
                                choices: roles
                            }
                        ])
                        .then((ans) => {
                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                            const params = [ans.roles, answers.title];

                            db.query(sql, params, (err, res) => {
                                if (err) throw err;
                                console.log('Updated employee in the database');
                                Prompts();
                            });
                        });
                });
            });
    });
}

