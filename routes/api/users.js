const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateMatchInfoInput = require("../../validation/matchinfo");

// Load User model
const User = require("../../models/User");
const MatchInfo = require("../../models/MatchInfo");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route POST api/match_info/matchinfo
// @add match info
// @access Public
router.post("/matchinfo", (req, res) => {
  // Form validation
  const { errors, isValid } = validateMatchInfoInput(req.body);

  console.log(errors, isValid);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  MatchInfo.findOne({ match_no: req.body.match_no }).then(matchinfo => {
    if (matchinfo) {
      return res.status(400).json({ match_date: "Match data already exists" });
    } else {
      console.log(req.body);
      const matchinfo = new MatchInfo({
        match_no: req.body.match_no,
        team1: req.body.team1,
        team2: req.body.team2,
        match_date: req.body.match_date,
        season_year: req.body.season_year ,
        venue_name: req.body.venue_name,
        city_name: req.body.city_name,
        country_name: req.body.country_name,
        toss_winner: req.body.toss_winner,
        match_winner: req.body.match_winner,
        toss_name: req.body.toss_name,
        win_type: req.body.win_type,
        outcome: req.body.outcome,
        man_of_match: req.body.man_of_match,
        win_margin: req.body.win_margin
      });
      matchinfo.save().then(matchinfo => res.json(matchinfo)).catch(err => console.log(err));
    }
  });
});

//setting _id and __v it to 0 in the projection to remove from result
router.get("/matches", (req, res) => {
  MatchInfo.find({},{_id: 0, __v: 0}).then(match => {
    console.log("Match", match);
    res.send(match);
  })
});

module.exports = router;
