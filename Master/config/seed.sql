-- create database
DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db;

-- create table for employee
CREATE TABLE employee (
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
);

-- create table for role
CREATE TABLE roles (
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
);

-- create table for department
CREATE TABLE department (
    department_name VARCHAR(30),
);