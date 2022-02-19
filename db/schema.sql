DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30)NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
);
CREATE TABLE roles (
  title VARCHAR (30),
  salary DECIMAL (6,2),
  department_id INTEGER,
);
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (30) NOT NULL
);

