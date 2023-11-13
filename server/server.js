const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const Game = require("./models/game");
const Review = require("./models/review");
mongoose.connect(process.env.API_GAME_KEY);

// add your endpoints here

app.get("/games", async (req, res) => {
  const games = await Game.find(req.query);
  res.json(games);
});

app.get("/reviews", async (req, res) => {
  const reviews = await Review.find(req.query);
  res.json(reviews);
});

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
