import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewModal from "./ReviewModal";

export default function Review({
  comments,
  gameId,
  id,
  review,
  username,
  userRating,
  deleteReview,
}) {
  const { user } = useAuth0();

  const [game, setGame] = useState({});
  useEffect(() => {
    getGame();
  }, []);

  const [showModal, setShowModal] = useState(false);

  async function getGame() {
    const API = `https://hapigamr.onrender.com/games?_id=${gameId}`;
    const result = await axios.get(API);
    setGame(result.data[0]);
  }

  if (game.title) {
    return (
      <>
        <article className="review">
          {user && username === user.nickname && (
            <div className="review__controls">
              <button onClick={() => setShowModal(true)}>Update</button>
              <button onClick={() => deleteReview(id)}>Delete</button>
            </div>
          )}
          <img src={game.boxArtUrl} alt={game.title} />
          <div className="review__content">
            <h3>
              {username} rated <Link to={`/game/${gameId}`}>{game.title}</Link>{" "}
              {userRating}/10
            </h3>
            <p>"{comments}"</p>
          </div>
        </article>
        {showModal && (
          <ReviewModal review={review} setShowModal={setShowModal} />
        )}
      </>
    );
  }
}
