DROP DATABASE IF EXISTS fun_db;
CREATE DATABASE fun_db;

USE fun_db;

CREATE TABLE users
(
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE groups
(
    id INT AUTO_INCREMENT NOT NULL,
    group_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) references users(id)
);

CREATE TABLE user_groups
(
    user_id int NOT NULL,
    group_id int NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id)
);

CREATE TABLE activities
(
    id int AUTO_INCREMENT NOT NULL,
    category VARCHAR(50) NOT NULL,
    activity_name VARCHAR(250) NOT NULL,
    activity_location VARCHAR(50) NOT NULL,
    activity_price int NOT NULL,
    notes VARCHAR(250) NOT NULL,
    complete boolean NOT NULL DEFAULT FALSE,
    group_id int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id)
    PRIMARY KEY (id)
);

CREATE TABLE votes
(
    group_id int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id)
);
