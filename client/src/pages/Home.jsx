import Reviews from "../components/Reviews";
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
      <h2>Recent Reviews</h2>
      <Reviews reviews={reviews} deleteReview={deleteReview} />
    </main>
  );
}
