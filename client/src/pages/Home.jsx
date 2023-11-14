import Review from "../components/Review";
export default function Home({ reviews }) {
  return (
    <section className="recent-reviews">
      <h2>Recent Reviews</h2>
      {reviews.map((review) => {
        return (
          <Review
            comments={review.comments}
            gameId={review.gameId}
            key={review._id}
            username={review.username}
            userRating={review.userRating}
          />
        );
      })}
    </section>
  );
}
