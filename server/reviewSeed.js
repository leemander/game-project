const mongoose = require("mongoose");
require("dotenv").config();

const Review = require("./models/review");

mongoose.connect(process.env.API_GAME_KEY);

async function seed() {
  await Review.create({
    username: "Jon",
    gameId: "655206c9ad7cbd793c1d57a8",
    userRating: 8,
    comments: "Great",
  });

  mongoose.disconnect();
}

seed();
