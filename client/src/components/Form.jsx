// add import Form from "./components/Form";
// render Form on page <Form games={games} setGames={setGames} game={game} setGame={setGame} reviews={reviews} setReviews={setReviews} review={review} setReview={setReview}/>
//function APP props to add - const [selectedGame, setSelectedGame] = useState({}); const [selectedReview, setSelectedReview] = useState({});

// userRating used twice in below useState
// name of buttons they are currently saying submit

import { useState } from "react";
import axios from "axios";

export default function Form({
  games,
  setGames,
  game,
  setGame,
  reviews,
  setReviews,
  review,
  setReview,
}) {
  const [formData, setFormData] = useState(
    game ?? {
      title: "",
      genre: "",
      releaseYear: "",
      userRating: "",
      description: "",
      boxArtUrl: "",
      username: "",
      gameId: "",
      userRating: "",
      comments: "",
      //user rating is duplicated here and in both forms
    }
  );

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function addGame(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/games`;
    const res = await axios.post(API, formData);
    setGames([...games, res.data]);
  }

  async function updateGame(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/games/${game._id}`;
    await axios.put(API, formData);
    setGame(formData);
  }

  async function addReview(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/reviews`;
    const res = await axios.post(API, formData);
    setReviews([...reviews, res.data]);
  }

  async function updateReview(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/reviews/${review._id}`;
    await axios.put(API, formData);
    setReview(formData);
  }

  return (
    <>
      <form onSubmit={game?._id ? updateGame : addGame}>
        <input
          name="title"
          placeholder="Game title"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
          value={formData.genre}
        />
        <input
          name="releaseYear"
          placeholder="Release Year"
          onChange={handleChange}
          value={formData.releaseYear}
        />
        <input
          name="userRating"
          placeholder="User Rating"
          onChange={handleChange}
          value={formData.userRating}
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        />
        <input
          name="boxArtUrl"
          placeholder="Box Art Url"
          onChange={handleChange}
          value={formData.boxArtUrl}
        />

        <button>{game?._id ? "Update game" : "Submit game"}</button>
      </form>

      <form onSubmit={review?._id ? updateReview : addReview}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          name="gameId"
          placeholder="Game ID"
          onChange={handleChange}
          value={formData.gameId}
        />
        <input
          name="userRating"
          placeholder="User Rating"
          onChange={handleChange}
          value={formData.userRating}
        />
        <input
          name="comments"
          placeholder="User Comments"
          onChange={handleChange}
          value={formData.comments}
        />

        <button>{game?._id ? "Update review" : "Submit review"}</button>
      </form>
    </>
  );
}
