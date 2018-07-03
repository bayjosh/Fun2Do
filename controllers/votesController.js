var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var connection = require('../config/connection.js')

router.post('/upvote', function(req,res) {
		var query = "INSERT INTO upvotes (user_id, activity_id, group_id) VALUES (?, ?, ?)"

		connection.query(query, [ req.session.user_id, req.body.activity_id, req.body.group_id ], function(err, response) {
			if (err) throw err
			res.redirect('/users/mygroups/' + req.body.group_id);
		});
	
});

router.post('/downvote', function(req,res) {
	//make sure user inserting is a customer
	if (!req.session.company){
		var query = "INSERT INTO downvotes (user_id, activity_id, group_id) VALUES (?, ?, ?)"

		connection.query(query, [ req.session.user_id, req.body.activity_id, req.body.group_id ], function(err, response) {
            if (err) throw err
            /*
              MB: throw new Error(err);
            */

			res.redirect('/users/mygroups/' + req.body.group_id);
		});
	}else{
		res.send('you do not have access to this because you are not a customer')
	}
});



module.exports = router;
