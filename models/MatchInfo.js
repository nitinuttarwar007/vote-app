const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create MatchInfo Schema
const MatchInfoSchema = new Schema({
  team1: {
    type: String,
    required: true
  },
  team2: {
    type: String,
    required: true
  },
  match_date: {
    type: Date,
    required: true
  },
  season_year: {
    type: String,
    required: true
  },
  venue_name: {
    type: String,
    required: true
  },
  city_name: {
    type: String,
    required: true
  },
  country_name: {
    type: String,
    required: true,
    default: 'India'
  },
  toss_winner: {
    type: String
  },
  match_winner: {
    type: String
  },
  toss_name: {
    type: String
  },
  win_type: {
    type: String
  },
  outcome: {
    type: String
  },
  man_of_match: {
    type: String
  },
  win_margin: {
    type: String
  }
});

module.exports = User = mongoose.model("match_info", MatchInfoSchema);
