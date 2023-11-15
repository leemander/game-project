// add import FormAddReview from "./components/FormAddReview";

// render Form on page <FormAddReview reviews={reviews} setReviews={setReviews} review={review} setReview={setReview}/>

//function APP props to add - const [game, setGame] = useState({}); const [review, setReview] = useState({});

// userRating used twice in below
// name of buttons they are currently saying submit
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";

export default function Form({ reviews, setReviews, review /*setReview*/ }) {
  const { user } = useAuth0();

  const [formData, setFormData] = useState(
    review ?? {
      username: user.nickname,
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
    setReview(res.data);
  }

  async function updateReview(event) {
    event.preventDefault();
    const API = `https://hapigamr.onrender.com/reviews/${review._id}`;
    await axios.put(API, formData);
    window.location.reload();
  }

  return (
    <>
      <div className="formBox">
        <h3>UPDATE YOUR REVIEW</h3>
        <form
          className="addReviewForm"
          onSubmit={review?.gameId ? updateReview : addReview}
        >
          {/* <input
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
        /> */}
          <label htmlFor="user-rating">
            <h3>User rating</h3>
            <input
              id="user-rating"
              name="userRating"
              placeholder="User Rating"
              onChange={handleChange}
              value={formData.userRating}
            />
          </label>
          <h3>Comments</h3>
          <textarea
            name="comments"
            placeholder="User Comments"
            onChange={handleChange}
            value={formData.comments}
          />

          <button className="addReviewbutton">
            {review?.gameId ? "Update review" : "Submit review"}
          </button>
        </form>
      </div>
    </>
  );
}
