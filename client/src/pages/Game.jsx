import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Review from "../components/Review";
import Reviews from "../components/Reviews";
import ReviewModal from "../components/ReviewModal";

export default function Game({ reviews, deleteReview }) {
  const params = useParams();
  const { user } = useAuth0();

  const [game, setGame] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState({});

  useEffect(() => {
    getGame();
  }, []);

  useEffect(() => {
    //hacky way to give time for auth0 to get user
    setTimeout(() => {
      setLoading(false);
      filterReviews();
    }, 500);
  }, [reviews]);

  useEffect(() => {
    getUserReview();
  }, [filteredReviews]);

  function filterReviews() {
    setFilteredReviews(reviews.filter((review) => review.gameId === params.id));
  }

  function getUserReview() {
    const userReviewArray = filteredReviews.filter(
      (review) => review.username === user?.nickname
    );
    if (userReviewArray.length) {
      setUserReview(userReviewArray[0]);
    }
  }

  function toggleReviewModal() {
    setShowModal(true);
  }

  async function getGame() {
    const API = `https://hapigamr.onrender.com/games?_id=${params.id}`;
    const res = await axios.get(API);
    setGame(res.data[0]);
  }

  return (
    <>
      <main className="game">
        {!loading && (
          <>
            <small>
              <a href="#reviews">skip to reviews</a>
            </small>
            <h2>
              {game.title} ({game.releaseYear})
            </h2>
            <div className="game__details">
              <span>Genre: {game.genre}</span>
              <span>MobyGames user score: {game.userRating}</span>
            </div>
            <img
              src={game.boxArtUrl}
              alt={game.title}
              className="game__img"
            ></img>
            <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
            {reviews.length && (
              <section className="reviews" id="reviews">
                {userReview.gameId && (
                  <>
                    <h3>Your Review</h3>
                    <Review
                      comments={userReview.comments}
                      gameId={userReview.gameId}
                      id={userReview._id}
                      review={userReview}
                      username={userReview.username}
                      userRating={userReview.userRating}
                      deleteReview={deleteReview}
                    />
                  </>
                )}
                <h3>All Reviews</h3>
                <Reviews
                  reviews={filteredReviews}
                  deleteReview={deleteReview}
                />
              </section>
            )}
            {user && !userReview.gameId && (
              <button onClick={toggleReviewModal} className="game__add-button">
                Add Review
              </button>
            )}
          </>
        )}
      </main>
      {showModal && (
        <ReviewModal setShowModal={setShowModal} gameId={params.id} />
      )}
    </>
  );
}
