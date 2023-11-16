import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../components/Reviews";

export default function Game() {
  const params = useParams();

  useEffect(() => {
    getGame();
  }, []);

  async function getGame() {
    const API = `https://hapigamr.onrender.com/games?_id=${params.id}`;
    const res = await axios.get(API);
    setGame(res.data[0]);
  }

  const [game, setGame] = useState({});

  return (
    <main>
      <h2>{game.title}</h2>
      <p>{game.genre}</p>
      <img src={game.boxArtUrl}></img>
      <h2>{game.releaseYear}</h2>
      <p>{game.userRating}</p>
      <p>{game.description}</p>
      {/* <Reviews /> */}
      {/* <button onClick={toggleReviewModal}>Add Review</button> */}
    </main>
  );
}
