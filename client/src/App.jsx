import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import About from "./pages/About";
import Game from "./pages/Game";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import FormAddGame from "./components/FormAddGame";
import FormAddReview from "./components/FormAddReview";

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
    const API = `https://hapigamr.onrender.com/reviews/${id}`;
    const res = await axios.delete(API);
    getReviews();
  }

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>hAPIgamr</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {/* <li>
                <Link to="/profile"> Profile</Link>
              </li> */}
            </ul>
          </nav>
          <div className="header__user">
            <span>{user ? `Welcome, ${user.nickname}` : "Log in?"}</span>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>

          <FormAddGame
            games={games}
            setGames={setGames}
            game={game}
            setGame={setGame}
          />
          
          <FormAddReview
            reviews={reviews}
            setReviews={setReviews}
            review={review}
            setReview={setReview}
          />
          
        </header>

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
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
