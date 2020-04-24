#DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
id int auto_increment,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id int	auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int,
manager_id int,
PRIMARY KEY(id)
);

CREATE TABLE role (
id int auto_increment,
title varchar(30) not null,
salary decimal,
department_id int,
PRIMARY KEY(id)
);