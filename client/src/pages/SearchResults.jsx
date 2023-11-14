import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SearchResults() {
  const params = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  function converToTitleCase(string) {
    let stringArr = string.trim().toLowerCase().split(" ");
    stringArr = stringArr.map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    });
    return stringArr.join(" ");
  }

  async function getResults() {
    const API = `https://hapigamr.onrender.com/games?title=${converToTitleCase(
      params.query
    )}`;
    const res = await axios.get(API);
    setResults(res.data);
  }

  return (
    <main>
      <h2>Results for "{converToTitleCase(params.query)}"</h2>
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
      <p>
        Can't find what you're looking for? Click <Link to={"/"}>here</Link> to
        add a new game.
      </p>
    </main>
  );
}
