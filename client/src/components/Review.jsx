import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Review({ comments, gameId, username, userRating }) {
  const [game, setGame] = useState({});
  useEffect(() => {
    getGame();
  }, []);

  async function getGame() {
    const API = `https://hapigamr.onrender.com/games?_id=${gameId}`;
    const result = await axios.get(API);
    setGame(result.data[0]);
  }

  if (game.title) {
    return (
      <article className="review">
        <img src={game.boxArtUrl} alt={game.title} />
        <div className="review__content">
          <h3>
            {username} rated <Link to={`/game/${gameId}`}>{game.title}</Link>{" "}
            {userRating}
          </h3>
          <p>"{comments}"</p>
        </div>
      </article>
    );
  }
}
