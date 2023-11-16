import Reviews from "../components/Reviews";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Home({
  reviews,
  searchTerm,
  setSearchTerm,
  deleteReview,
  setShowMenu,
}) {
  const location = useLocation();
  useEffect(() => {
    setShowMenu(false);
  }, [location]);
  return (
    <main>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Recent Reviews</h2>
      <Reviews reviews={reviews.slice(0, 20)} deleteReview={deleteReview} />
    </main>
  );
}
