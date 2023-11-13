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
