var express = require('express');
var router  = express.Router();

//this is the users_controller.js file
router.get('/', function(req,res) {
  res.render('index');
});

module.exports = router;

function groupCodeGenerator(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

console.log(groupCodeGenerator(1000, 10000));


