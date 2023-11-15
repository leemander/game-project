import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SearchResults({ games }) {
  const params = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getResults();
  }, [games]);

  // function convertToTitleCase(string) {
  //   let stringArr = string.trim().toLowerCase().split(" ");
  //   stringArr = stringArr.map((word) => {
  //     return word[0].toUpperCase() + word.slice(1);
  //   });
  //   return stringArr.join(" ");
  // }

  async function addNewGame(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/games?searchTerm=${params.query}`;
    setIsLoading(true);
    await axios.post(API);
    window.location.reload();
  }

  function getResults() {
    const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(params.query.toLowerCase())
    );
    setResults(filteredGames);
  }

  return (
    <main>
      <h2>Results for "{params.query}"</h2>
      {results.length ? (
        <ul className="results">
          {results.map((result) => {
            return (
              <Link key={result._id} to={`/game/${result._id}`}>
                <li className="result">
                  <img
                    src={result.boxArtUrl}
                    alt={result.title}
                    className="result__img"
                  />
                  <h3>
                    {result.title} ({result.releaseYear})
                  </h3>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
      {!isLoading ? (
        <p>
          Can't find what you're looking for?{" "}
          <a href="#" onClick={addNewGame}>
            Click here
          </a>{" "}
          to add a new game.
        </p>
      ) : (
        <p>Adding new game...</p>
      )}
    </main>
  );
}
