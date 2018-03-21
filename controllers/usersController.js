var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = require('../config/connection.js')

//this is the users_controller.js file
router.get('/register', function (req, res) {
    res.render('users/register');
});

// router.get('/success', function (req, res) {
//     res.render('users/success')
// });

router.get('/login', function (req, res) {
    res.render('users/login');
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
        if (err) throw err
        if (response.length == 0) {
            res.render('users/login', {
                badUsername: true,
            })

        } else {
            var query = "SELECT * FROM users WHERE username = ? AND user_password = ?";

            connection.query(query, [req.body.username, req.body.user_password], function (err, response) {
                if (err) throw err
                if (response.length == 0) {
                    res.render('users/login', {
                        badPassword: true,
                    })
                } else {


                    // bcrypt.compare(req.body.user_password, response[0].user_password_hash, function (err, result) {
                    //     if (result == true) {



                    req.session.logged_in = true;
                    req.session.user_id = response[0].id;
                    req.session.email = response[0].email;
                    req.session.first_name = response[0].first_name;
                    req.session.last_name = response[0].last_name
                    req.session.username = response[0].username;

                    res.redirect('/users/mygroups');

                }
            });
        };
    });
});
router.get('/mygroups', function (req, res) {
    var query = "SELECT * FROM groups INNER JOIN user_groups ON groups.id = user_groups.group_id AND user_groups.user_id = ?";
    var myGroupsArr = [];
    
    connection.query(query, [req.session.user_id], function (err, response) {
        if (err) throw err
        for (var i = 0; i < response.length; i++){
            myGroupsArr.push(response[i])
        }
        // console.log(myGroupsArr);
        req.session.myGroups = myGroupsArr;
        if (response.length == 0) {
            res.render('users/mygroups', {
                noGroups: true,
                logged_in: req.session.logged_in,
                user_email: req.session.email,
                user_id: req.session.user_id,
                first_name: req.session.first_name,
                username: req.session.username
            })
        } else {
            res.render('users/mygroups', {
                myGroups: req.session.myGroups,
                logged_in: req.session.logged_in,
                user_email: req.session.email,
                user_id: req.session.user_id,
                first_name: req.session.first_name,
                username: req.session.username

            })
        }
    })
})
router.get('/mygroups/:groupid', function (req, res) {
    var groupid = req.params.groupid
    var query = "SELECT * FROM activities INNER JOIN groups ON activities.group_id = groups.id AND activities.group_id = ?"   
    var activitiesArr = []
    connection.query(query, [groupid], function (err, response) {
        if (err) throw err
        for (var i = 0; i < response.length; i++){
            activitiesArr.push(response[i])
        }
        if (response.length == 0) {
            res.render('users/thisgroup', {
                group_id: groupid,
                // groupName: groupName,
                noActivities: true,
                logged_in: req.session.logged_in,
                user_email: req.session.email,
                user_id: req.session.user_id,
                first_name: req.session.first_name,
                username: req.session.username
            })
        }else {
            var query2 = "SELECT * FROM activities a RIGHT JOIN (SELECT activity_id, count(*) AS vote_count FROM upvotes GROUP BY activity_id) AS votes ON a.id = votes.activity_id"

            var query3 = "SELECT * FROM activities a LEFT JOIN (SELECT activity_id, count(*) AS vote_count FROM downvotes GROUP BY activity_id) AS votes ON a.id = votes.activity_id AND av"
            var voteArr = []    
            connection.query(query2, function(err, votesResponse){
                console.log('this is it ' + votesResponse)
                if (err) throw err
                for (var i = 0; i<votesResponse.length; i++){
                voteArr.push(votesResponse[i].vote_count)
                }
                console.log(voteArr)
                
    
            
            res.render('users/thisgroup', {
                group_id: groupid,
                // groupName: groupName,
                activities: activitiesArr,
                upvotes: voteArr,
                logged_in: req.session.logged_in,
                user_email: req.session.email,
                user_id: req.session.user_id,
                first_name: req.session.first_name,
                username: req.session.username
            })
            })
        }
        
    })
        // console.log(groupid)
        // var groupName = response[0].group_name

        

       

        
        
        

    })




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

    connection.query(query, [req.body.username, req.body.email, req.body.first_name, req.body.last_name, req.body.user_password,], function (err, response) {
        if (err) throw err

        req.session.logged_in = true;
        req.session.user_id = response.insertId; //only way to get id of an insert for the mysql npm package
        
    


    var query2 = "SELECT * FROM users WHERE username = ?";

    connection.query(query2, [req.body.username], function (err, response) {
        if (err) throw err

        console.log(response);

        if (response.length === 0) {
        
        }


        req.session.logged_in = true;
        req.session.user_id = response[0].id;
        req.session.email = response[0].email;
        req.session.first_name = response[0].first_name;
        req.session.last_name = response[0].last_name
        req.session.username = response[0].username;

        
        res.redirect('/users/mygroups');

    });    
    });

});

// router.get('/mygroups', function(req,res){
//     var query = "SELECT * FROM users WHERE id=?"
//     connection.query(query, [req.session.user_id], function (err, response) {
//         if (err) throw err;
//         req.session.logged_in = true;
//         req.session.user_id = response[0].id;
//         req.session.email = response[0].email;
//         req.session.first_name = response[0].first_name;
//         req.session.last_name = response[0].last_name
//         req.session.username = response[0].username;
//         res.render('users/mygroups', {
//             logged_in: req.session.logged_in,
//             user_email: req.session.email,
//             user_id: req.session.user_id,
//             first_name: req.session.first_name,
//             username: req.session.username
//         });

//     });

// })

router.post('/joinGroup', function (req, res) {

    var query = "SELECT * FROM groups WHERE group_code = ?";

    connection.query(query, [req.body.groupCode], function (err, firstResponse) {
        if (err) throw err

        if (firstResponse.length === 0) {
            res.redirect('/users/mygroups')
            // alert('That group code doesn\'t exist');

        } else {

            var query = "INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)";

            connection.query(query, [req.session.user_id, firstResponse[0].id], function (err, response) {
                if (err) throw err

                var query = "SELECT * FROM groups INNER JOIN user_groups ON groups.id = user_groups.group_id AND user_groups.user_id = ?";
                var myGroupsArr = [];
                // var myGroupsIdsArr = []

                connection.query(query, [req.session.user_id], function (err, response) {
                    for (var i = 0; i < response.length; i++) {
                        myGroupsArr.push(response[i].group_name)
                        // myGroupsIdsArr.push(response[i].group_id)
                    }
                    req.session.myGroups = myGroupsArr;
                    // req.session.myGroupsIds = myGroupsIdsArr;

                    res.redirect('/users/mygroups');

                    // res.render('users/mygroups', {
                    //     youJoined: true,
                    //     noGroups: false,
                    //     myGroupsIds: req.session.myGroupsIds,
                    //     group_name: firstResponse[0].group_name,
                    //     myGroups: req.session.myGroups,
                    //     logged_in: req.session.logged_in,
                    //     user_email: req.session.email,
                    //     user_id: req.session.user_id,
                    //     first_name: req.session.first_name,
                    //     username: req.session.username

                    // })

                })
            })
        }
    })
})


router.post('/addActivity', function (req, res) {
    var query = "INSERT INTO activities (activity_name, category, activity_location, activity_price, activity_date, notes, user_id, group_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, [req.body.activity_name, req.body.category, req.body.activity_location, req.body.activity_price, req.body.activity_date, req.body.notes, req.session.user_id, req.body.group_id], function (err, response) {
        if (err) throw err;


    })

    res.redirect('/users/mygroups/' + req.body.group_id)
})

router.post('/createGroup', function (req, res) {

    var query = "INSERT INTO groups (group_name, group_description, group_code, admin_id) VALUES (?, ?, ?, ?)";
    var newGroupId = 0;
    var query2 = "SELECT id FROM groups GROUP BY id";
    var query3 = "INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)";

            connection.query(query, [req.body.group_name, req.body.group_description, req.body.group_code, req.session.user_id], function (err, seth) {
                if (err) return err
                    // connection.end();
            })
        
        
            connection.query(query2, function (err, response) {
                if (err) return err;
                newGroupId = response[response.length-1].id
                console.log(newGroupId + ' from query2')
                    console.log(newGroupId);
                    connection.query(query3, [req.session.user_id, newGroupId], function (err, response) {
                        if (err) return err;
                        // console.log(newGroupId + ' from query3');
                        // req.session.myGroups = [];
                        res.redirect('/users/mygroups');
                       
            
                    })
            })
        
         
})

module.exports = router