const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new Schema({
  title: String,
  genre: String,
  releaseYear: String,
  userRating: Number,
  description: String,
  boxArtUrl: String,
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
