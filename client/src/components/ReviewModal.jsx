import FormAddReview from "./FormAddReview";

export default function ReviewModal({ review, setShowModal }) {
  function handleClick(e) {
    if (e.target.className === "modal-backdrop") {
      setShowModal(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleClick}>
      <dialog className="review-modal" open>
        <button onClick={() => setShowModal(false)}>Close</button>
        <FormAddReview review={review} />
      </dialog>
    </div>
  );
}
