import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import About from "./pages/About";
import Game from "./pages/Game";
import Home from "./pages/Home";

function App() {
  const [reviews, setReviews] = useState([]);
  const [games, setGames] = useState([]);
  // const { user, isAuthenticated, isLoading } = useAuth0();

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
  return (
    <>
      <BrowserRouter>
        <header>
          <h1>hAPIgamr</h1>

          {/* {isAuthenticated ? <LogOutButton /> : <LogInButton />} */}

          <Link to="/"> Home</Link>
          <Link to="/about"> About</Link>
          {/* <Link to="/profile"> Profile</Link> */}
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
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/game/:id" element={<Game />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
