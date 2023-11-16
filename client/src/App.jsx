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
  const [showMenu, setShowMenu] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    getReviews();
    getGames();
  }, []);

  async function getReviews() {
    const API = "https://hapigamr.onrender.com/reviews";
    const res = await axios.get(API);
    setReviews(res.data.reverse());
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
      await axios.delete(API);
      window.location.reload();
    }
  }
  return (
    <>
      <BrowserRouter>
        <header>
          <div className="container">
            <h1>hAPIgamr</h1>
            <button onClick={() => setShowMenu(true)}>Show Menu</button>
            <nav className={showMenu ? "show" : ""}>
              <button className="nav__close" onClick={() => setShowMenu(false)}>
                X
              </button>
              <ul>
                <li>
                  <div className="header__user">
                    <div className="user__greeting">
                      <span>
                        {user ? `Welcome, ${user.nickname}` : "Log in?"}
                      </span>
                      {user && (
                        <img
                          src={user.picture}
                          alt={user.nickname}
                          className="user__img"
                        />
                      )}
                    </div>
                    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                  </div>
                </li>
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
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  reviews={reviews}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  deleteReview={deleteReview}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/game/:id"
              element={
                <Game
                  reviews={reviews}
                  deleteReview={deleteReview}
                  user={user}
                />
              }
            />
            <Route
              path="/search/:query"
              element={<SearchResults games={games} />}
            />
            <Route
              path="/profile"
              element={
                <Profile reviews={reviews} deleteReview={deleteReview} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
