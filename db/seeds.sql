INSERT INTO users (username, email, first_name, last_name, user_password)
VALUES ("josh", "josh@josh.com", "Josh", "Bay", "password");

INSERT INTO users (username, email, first_name, last_name, user_password)
VALUES ("seth", "seth@seth.com", "Seth", "Feder", "password");

INSERT INTO users (username, email, first_name, last_name, user_password)
VALUES ("dan", "dan@dan.com", "Dan", "McCracken", "password");

INSERT INTO groups (group_name, user_id)
VALUES ("My Best Friends", 2);

INSERT INTO groups (group_name, user_id)
VALUES ("Coworkers", 1);

INSERT INTO activities (category, activity_name, activity_location, activity_price, notes, group_id, user_id)
VALUES ("Movies", "See Black Planther", "Lincoln Park", "10", "Wakanda forever!", 1, 2);

INSERT INTO activities (category, activity_name, activity_location, activity_price, notes, group_id, user_id)
VALUES ("Sports", "Bulls Game", "United Center", "50", "They're playing the Lakers", 1, 3);

INSERT INTO activities (category, activity_name, activity_location, activity_price, notes, group_id, user_id)
VALUES ("TV", "West Wing marathon", "My apt", "free99", "#PresidentBartlet", 2, 1);

INSERT INTO activities (category, activity_name, activity_location, activity_date, activity_price, notes, group_id, user_id)
VALUES ("Concerts", "See Kygo", "United Center","May 5th 2018 at 7:30pm", "$100 at least", "Guys we need to see kygo", 2, 2);



