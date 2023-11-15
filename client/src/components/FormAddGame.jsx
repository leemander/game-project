// add import FormAddGame from "./components/FormAddGame";

// render Form on page <Form games={games} setGames={setGames} game={game} setGame={setGame}/>

//function APP props to add - const [game, setGame] = useState({});

// name of buttons they are currently saying submit

import { useState } from "react";
import axios from "axios";

export default function Form({ games, setGames, game, setGame }) {
  const [formData, setFormData] = useState(
    game ?? {
      title: "",
      genre: "",
      releaseYear: "",
      userRating: "",
      description: "",
      boxArtUrl: "",
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
    </>
  );
}
