DROP DATABASE IF EXISTS fun_db;
CREATE DATABASE fun_db;

USE fun_db;

CREATE TABLE users
(
    id INT AUTO_INCREMEMNT NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)

)

CREATE TABLE groups
(
    id INT AUTO_INCREMEMNT NOT NULL,
    group_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (user_id) references users(id)

)

CREATE TABLE user_groups
(
    user_id int NOT NULL,
    group_id int NOT NULL,
    FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (group_id) references groups(id)


)





