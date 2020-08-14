USE employee_tracker;

INSERT INTO department 
    (name)
VALUES
    ("Marketing"),
    ("Sales"),
    ("Engineering"),
    ("Design");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Social Media Marketer", 64000, 1),
    ("Sales Lead", 84000, 2),
    ("Product Engineer", 104000, 3),
    ("Designer", 72000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, 1),
    ("Peter", "Wiggin", 2, 3),
    ("Sam", "Smith", 3, NULL);