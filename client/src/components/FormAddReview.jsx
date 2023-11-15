// add import FormAddReview from "./components/FormAddReview";

// render Form on page <FormAddReview reviews={reviews} setReviews={setReviews} review={review} setReview={setReview}/>

//function APP props to add - const [game, setGame] = useState({}); const [review, setReview] = useState({});

// userRating used twice in below
// name of buttons they are currently saying submit

import { useState } from "react";
import axios from "axios";

export default function Form({ reviews, setReviews, review, setReview }) {
  const [formData, setFormData] = useState(
    review ?? {
      username: "",
      gameId: "",
      userRating: "",
      comments: "",
    }
  );

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function addReview(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/reviews`;
    const res = await axios.post(API, formData);
    setReviews([...reviews, res.data]);
  }

  async function updateReview(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/reviews/${review._id}`;
    await axios.put(API, formData);
    setReview(formData);
  }

  return (
    <>
      <form onSubmit={review?._id ? updateReview : addReview}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          name="gameId"
          placeholder="Game ID"
          onChange={handleChange}
          value={formData.gameId}
        />
        <input
          name="userRating"
          placeholder="User Rating"
          onChange={handleChange}
          value={formData.userRating}
        />
        <input
          name="comments"
          placeholder="User Comments"
          onChange={handleChange}
          value={formData.comments}
        />

        <button>{review?._id ? "Update review" : "Submit review"}</button>
      </form>
    </>
  );
}
