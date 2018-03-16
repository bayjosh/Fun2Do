var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = require('../config/connection.js')

//this is the users_controller.js file
router.get('/new', function (req, res) {
    res.render('users/new');
});

router.get('/sign-in', function (req, res) {
    res.render('users/sign_in');
});

router.get('/mygroups', function (req,res){
    res.render('users/mygroups')
});

router.get('/sign-out', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    })
});



//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/login', function (req, res) {

    var query = "SELECT * FROM users WHERE username = ?";

    connection.query(query, [req.body.username], function (err, response) {
        if (response.length == 0) {
            res.redirect('users/sign-in')
        }

        bcrypt.compare(req.body.user_password, response[0].user_password_hash, function (err, result) {
            if (result == true) {

                req.session.logged_in = true;
                req.session.id = response[0].id;
                req.session.email = response[0].email;
                req.session.first_name = response[0].first_name;
                req.session.last_name = response[0].last_name
                req.session.username = response[0].username;

                res.redirect('users/mygroups');
            } else {
                res.redirect('users/sign-in')
            }
        });
    });
});
router.post('/register', function (req, res) {
    // var query = "SELECT * FROM users WHERE email = ?"

    //NEED TO TEST THIS////////////////////////////////////////////
    // connection.query(query, [req.body.email], function (err, response) {
    //     console.log(response)
    //     if (response.length > 0) {
    //         res.redirect('/users/new');
    //         console.log('We already have an account with this email')
    //     } 
        
        // else {
        //    var query = "SELECT * FROM users WHERE username = ?"

        //     //NEED TO TEST THIS////////////////////////////////////////////
        //     connection.query(query, [req.body.username], function (err, response) {
        //         console.log(response)
        //         if (response.length > 0) {
        //             res.redirect('/users/new');
        //             console.log('We already have an account with this username');
                    

                // else {

                    // bcrypt.genSalt(10, function (err, salt) {
                    //     //res.send(salt)
                    //     bcrypt.hash(req.body.user_password, salt, function (err, hash) {
                            var query = "INSERT INTO users (username, email, first_name, last_name, user_password) VALUES (?, ?, ?, ?, ?)"

                            connection.query(query, [req.body.username, req.body.email, req.body.first_name, req.body.last_name, req.body.user_password], function (err, response) {
console.log(response);
                                req.session.logged_in = true;

                                req.session.user_id = response.insertId; //only way to get id of an insert for the mysql npm package
                                console.log(req.session.id);

                                var query = "SELECT * FROM users WHERE id=?"
                                connection.query(query, [req.session.id], function (err, response) {
                                    console.log(req.session.id);
                                    if (err) throw err;
                                    console.log(response);
                                    req.session.username = response[0].username;
                                    req.session.email = response[0].email;

                                    res.redirect('users/mygroups')
                                });
                            });
                        });
                //     });

                // }
            // });


        // };
//     });
// });

module.exports = router