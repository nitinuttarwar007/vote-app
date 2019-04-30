const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateMatchInfoInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.team1 = !isEmpty(data.team1) ? data.team1 : "";
  data.team2 = !isEmpty(data.team2) ? data.team2 : "";
  data.match_date = !isEmpty(data.match_date) ? data.match_date : "";
  data.season_year = !isEmpty(data.season_year) ? data.season_year : "";
  data.venue_name = !isEmpty(data.venue_name) ? data.venue_name : "";
  data.city_name = !isEmpty(data.city_name) ? data.city_name : "";
  data.country_name = !isEmpty(data.country_name) ? data.country_name : "";
  data.toss_winner = !isEmpty(data.toss_winner) ? data.toss_winner : "";
  data.match_winner = !isEmpty(data.match_winner) ? data.match_winner : "";
  data.toss_name = !isEmpty(data.toss_name) ? data.toss_name : "";
  data.win_type = !isEmpty(data.win_type) ? data.win_type : "";
  data.outcome = !isEmpty(data.outcome) ? data.outcome : "";
  data.man_of_match = !isEmpty(data.man_of_match) ? data.man_of_match : "";
  data.win_margin = !isEmpty(data.win_margin) ? data.win_margin : "";

  // Team 1 checks
  if (Validator.isEmpty(data.team1)) {
    errors.team1 = "Team 1 field is required";
  }

   // Team 2 checks
   if (Validator.isEmpty(data.team2)) {
    errors.team2 = "Team 2 field is required";
  }

  // Match Date checks
  if (Validator.isEmpty(data.match_date)) {
    errors.match_date = "Match Datae is required";
  }

  // Match Season Year checks
  if (Validator.isEmpty(data.season_year)) {
    errors.season_year = "Match Season Year field is required";
  }

  // Match venue checks
  if (Validator.isEmpty(data.venue_name)) {
    errors.venue_name = "Match venue is required";
  }

  // Match city name checks
  if (Validator.isEmpty(data.city_name)) {
    errors.city_name = "Match city field is required";
  }

  // Country name checks
  if (Validator.isEmpty(data.country_name)) {
    errors.country_name = "Country Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
