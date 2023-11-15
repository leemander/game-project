import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SearchResults({ games }) {
  const params = useParams();
  const [results, setResults] = useState([]);

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
        <ul>
          {results.map((result) => {
            return (
              <Link key={result._id} to={`/game/${result._id}`}>
                <li>
                  {result.title} ({result.releaseYear})
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
      <p>
        Can't find what you're looking for?{" "}
        <a href="#" onClick={addNewGame}>
          Click here
        </a>{" "}
        to add a new game.
      </p>
    </main>
  );
}
