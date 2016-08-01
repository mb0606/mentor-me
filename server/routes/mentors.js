var router   = require("express").Router();
var _        = require('lodash');
var Users    = require('../models/user');
var Mentors  = require('../models/userMentor');

router.get('/mentor' , function(req, res){
  console.log('/mentor')
});

router.post('/mentor/users', function(req, res){
  console.log('learner/users');
  var newUser = _.pick(req.body, 'username', 'firstname',
                'lastname', 'email', 'password', 'phone',
                'skype_name', 'city', 'zip', 'primary_role',
                'secondary_role', 'rating', 'total_appointments',
                'rate', 'description', 'availability'
                );
  var skills   = req.body.skills
  var qualites = req.body.qualites


  Mentors.mentorCreate(req, res, newUser, skills, qualites);
});


router.get('/mentor/users/:userId', function(req, res){
  var userId = req.params.userId;
  Mentors.mentorFetchedById(req, res, userId);
});

router.get('/mentor/users/:userId/appointments', function(req, res){
  var userId = req.params.userId;
  Mentors.mentorFetchAppointment(req, res, userId);
});

router.get('/mentor/users/:userId/qualities', function(req, res){
  var userId = req.params.userId;
  Mentors.learnerFetchQualities(req, res, userId);
});

router.get('/learner/users/:userId/mentors', function(req, res){


});
module.exports = router;
