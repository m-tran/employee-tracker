DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
    name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT UNIQUE NOT NULL,
);

CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNIQUE NOT NULL,
    manager_id INT UNIQUE NOT NULL,
);