import FormAddReview from "./FormAddReview";

export default function ReviewModal({ review, setShowModal, gameId }) {
  function handleClick(e) {
    if (e.target.className === "modal-backdrop") {
      setShowModal(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleClick}>
      <dialog className="review-modal" open>
        <button onClick={() => setShowModal(false)}>Close</button>
        <FormAddReview review={review} gameId={gameId} />
      </dialog>
    </div>
  );
}
