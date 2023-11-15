import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import About from "./pages/About";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [reviews, setReviews] = useState([]);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [game, setGame] = useState({});
  const [review, setReview] = useState({});

  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    getReviews();
    getGames();
  }, []);

  async function getReviews() {
    const API = "https://hapigamr.onrender.com/reviews";
    const res = await axios.get(API);
    setReviews(res.data);
  }

  async function getGames() {
    const API = "https://hapigamr.onrender.com/games";
    const res = await axios.get(API);
    setGames(res.data);
  }

  async function deleteReview(id) {
    const confirmation = confirm(
      "Are you sure you want to delete this review? This can't be undone."
    );
    if (confirmation) {
      const API = `https://hapigamr.onrender.com/reviews/${id}`;
      const res = await axios.delete(API);
      getReviews();
    }
  }
  return (
    <>
      <BrowserRouter>
        <header>
          <div className="container">
            <h1>hAPIgamr</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile"> Profile</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>
            <div className="header__user">
              <span>{user ? `Welcome, ${user.nickname}` : "Log in?"}</span>
              {user && (
                <img
                  src={user.picture}
                  alt={user.nickname}
                  className="user__img"
                />
              )}
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  games={games}
                  setGames={setGames}
                  reviews={reviews}
                  setReviews={setReviews}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  deleteReview={deleteReview}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/game/:id" element={<Game />} />
            <Route
              path="/search/:query"
              element={<SearchResults games={games} />}
            />
            <Route path="/profile" element={<Profile reviews={reviews} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
