import { useEffect, useState } from "react";
import Reviews from "../components/Reviews";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile({ reviews, deleteReview }) {
  const { user } = useAuth0();
  const [userReviews, setUserReviews] = useState([]);

  function getUserReviews() {
    setUserReviews(
      reviews.filter((review) => review.username === user.nickname)
    );
  }

  useEffect(() => {
    if (user) {
      getUserReviews();
    }
  }, [user]);

  return (
    <main>
      {user ? (
        <>
          <h2>{user.nickname}'s Reviews</h2>
          <Reviews reviews={userReviews} deleteReview={deleteReview} />
        </>
      ) : (
        <p>Log in to see your reviews.</p>
      )}
    </main>
  );
}
