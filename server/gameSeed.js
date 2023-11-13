const mongoose = require("mongoose");
require("dotenv").config();

const Game = require("./models/game");

mongoose.connect(process.env.API_GAME_KEY);

async function seed() {
  await Game.create({
    title: "Tomb Raider",
    genre: "Action-adventure",
    releaseYear: "1995",
    userRating: 7,
    description: "Lara runs around",
    boxArtUrl: "https://i.ebayimg.com/images/g/t-gAAOSw~YZgiDXu/s-l1600.jpg",
  });

  mongoose.disconnect();
}

seed();
