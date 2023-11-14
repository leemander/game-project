const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const axios = require("axios");
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

app.post("/games", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const API = `https://api.mobygames.com/v1/games?title=${searchTerm}&api_key=${process.env.MOBY_KEY}`;
  const results = await axios.get(API);
  const returnedGame = results.data.games[0];
  const newGame = {
    title: returnedGame.title,
    genre: returnedGame.genres[0].genre_name,
    releaseYear: returnedGame.platforms[0].first_release_date.slice(0, 4),
    userRating: returnedGame.moby_score,
    description: returnedGame.description,
    boxArtUrl: returnedGame.sample_cover.image,
  };
  await Game.create(newGame);
  res.json(newGame);
});

app.get("/reviews", async (req, res) => {
  const reviews = await Review.find(req.query);
  res.json(reviews);
});

app.delete("/reviews/:id", async (req, res) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id);
  res.json(deletedReview);
});

app.put("/reviews/:id", async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body);
  res.json(updatedReview);
});

app.post("/reviews", async (req, res) => {
  const newReview = await Review.create(req.body);
  res.json(newReview);
});

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
