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
    user_password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE groups
(
    id INT AUTO_INCREMENT NOT NULL,
    group_name VARCHAR(50) NOT NULL,
    group_code INT,
    admin_id INT NOT NULL,
    date_group_created DATE,
    group_description VARCHAR(250),
    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) references users(id)
);

CREATE TABLE user_groups
(
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id)

);

CREATE TABLE activities
(
    id INT AUTO_INCREMENT NOT NULL,
    date_activity_created DATE,
    category VARCHAR(50) NOT NULL,
    activity_name VARCHAR(250) NOT NULL,
    activity_location VARCHAR(50),
    activity_price VARCHAR(50),
    activity_date VARCHAR(50),
    notes VARCHAR(250),
    complete boolean NOT NULL DEFAULT FALSE,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id),
    PRIMARY KEY (id)
);

CREATE TABLE upvotes
(
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id),
    FOREIGN KEY (activity_id) references activities(id)
);

CREATE TABLE downvotes
(
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id),
    FOREIGN KEY (activity_id) references activities(id)
);

