const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema({
  username: String,
  gameId: String,
  userRating: Number,
  comments: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
