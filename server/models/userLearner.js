var db = require('../db/db.js');
var async = require('async');

exports.learnerCreate = function(req, res, newUser, skills, preferences) {
    console.log("line 5: create learner", newUser);
    db.User.create(newUser)
      .then(function(user){
        user.createPreference(preferences, user.id)
        .then(function(preference){
            console.log("user perferences set", preference)
        })
      })
      .then(function(user){
        res.status(200).send(user)
      })
      .catch(function(err){
          console.error(err.message);
          res.status(500).send(err.message);
      });
};



exports.learnerFetchedById = function(req, res, userId){
    db.User.findById(userId)
        .then(function(user){
          console.log(user)
          res.status(200).send(user);
        })
        .catch(function (err) {
                console.error("learner Fetch by Id", err.message);
                res.status(500).send(err.message);

        });

}

exports.learnerFetchPreferences = function(req, res, userId){
    db.User.findById(userId)
        .then(function(user){
          console.log(user)
          user.getPreference()
          .then(function(preference){
            res.status(200).send(preference);
          })
          .catch(function (err) {
                  console.error("learner Prefernces", err.message);
                  res.status(500).send(err.message);

          })
        })
        .catch(function (err) {
                console.error("learner Prefernces", err.message);
                res.status(500).send(err.message);

        });

}




exports.learnerSearchMentors = function(req, res, term){
  db.User.findAll({
      where: {
        $or: [

          { username   : { $like: '%' + term + '%'}},
          { firstname  : { $like: '%' + term + '%'}},
          { lastname   : { $like: '%' + term + '%'}},
          { email      : { $like: '%' + term + '%'}},
          { phone      : { $like: '%' + term + '%'}},
          { description: { $like: '%' + term + '%'}}
        ]
      },
      $or: [{
      include : [{
                   model : db.Skill,
                   where : { title : {
                     $like: '%' + term + '%'}
                     }
                }]
      }]
    })
    .then(function(mentors){
        console.log("line 58: list of found mentors by term");
        res.status(200).send(mentors)
    })
    .catch(function(err){
        console.error(err.message);
        res.status(500).send(err.message);
    });


}


exports.learnerFetchMentors = function(req, res){

  db.User.findAll({
      where: {
        $or: [
          {primary_role  : "1"},
          {secondary_role: "1"}
        ]
      }
    })
    .then(function(mentors){
        console.log("line 81: user fetch mentors");
        res.status(200).send(mentors)
    })
    .catch(function(err){
        console.error(err.message);
        res.status(500).send(err.message);
    });



}

exports.learnerScheduleAppointment = function(req, res, appointment){
  console.log("inside learnerScheduleAppointment", appointment)
  db.Appointment.create(appointment)
  .then(function(appointment){
    res.status(200).send(appointment)
  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })

}


exports.learnerFetchAppointment = function(req, res, userId){
  console.log("inside learnerFetchAppointment")
  db.Appointment.findAll({
        where: {learnerId: userId}
  })
  .then(function(appointments){
    res.status(200).send(appointments)
  })
  .catch(function(err){
    console.error(err.message);
    res.status(500).send(err.message);
  })

}
