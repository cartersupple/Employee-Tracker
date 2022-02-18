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
db.connect(function(err) {
    if (err) throw err;
    promptUser();
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
    ]).then(function(answers) {
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
    
                case 'add departement':
                    addDepartment();
                break;
    
                case 'add role':
                    addRole();
                break;
    
                case 'add employee':
                    addEmployee();
                break;
    
                case 'update employee role':
                    updateRole();
                break;
    
                case 'exit':
                    break;    
             }
        })
    };
    function Employees(){
        const sql = `SELECT * FROM employee`
        db.query(sql, (err, res) => {
            if (err) throw err
            console.table(res)
            Prompts()
          });
    }
    function Departments(){
        const sql = `SELECT * FROM departments`
        db.query(sql, (err, res) => {
            if (err) throw err
            console.table(res)
            Prompts()
          });
    }
    function Roles(){
        const sql = `SELECT * FROM roles`
        db.query(sql, (err, res) => {
            if (err) throw err
            console.table(res)
            Prompts()
          });
    }

