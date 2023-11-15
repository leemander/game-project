import Review from "../components/Review";
import SearchBar from "../components/SearchBar";
export default function Home({
  reviews,
  searchTerm,
  setSearchTerm,
  deleteReview,
}) {
  return (
    <main>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className="recent-reviews">
        <h2>Recent Reviews</h2>
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
            />
          );
        })}
      </section>
    </main>
  );
}
