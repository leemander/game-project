import Review from "../components/Review";

export default function Reviews({ reviews, deleteReview }) {
  return (
    <section className="reviews">
      {reviews.map((review) => {
        return (
          <Review
            comments={review.comments}
            deleteReview={deleteReview}
            gameId={review.gameId}
            id={review._id}
            key={review._id}
            username={review.username}
            userRating={review.userRating}
            review={review}
          />
        );
      })}
    </section>
  );
}
