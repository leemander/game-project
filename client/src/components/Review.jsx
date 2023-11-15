import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Review({
  comments,
  gameId,
  id,
  username,
  userRating,
  deleteReview,
}) {
  const { user } = useAuth0();
  console.log(user);

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
          {user && username === user.nickname && (
            <div className="review__controls">
              <button>Update</button>
              <button onClick={() => deleteReview(id)}>Delete</button>
            </div>
          )}
          <h3>
            {username} rated <Link to={`/game/${gameId}`}>{game.title}</Link>{" "}
            {userRating}/10
          </h3>
          <p>"{comments}"</p>
        </div>
      </article>
    );
  }
}
