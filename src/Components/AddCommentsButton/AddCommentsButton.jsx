import React from "react";
import { useState } from "react";
import axios from "axios";

function AddCommentsButton({ id }) {
  const [comment, setComment] = useState("");
  async function sendComment(event) {
    event.preventDefault();
    try {
      let response = await axios.post(
        `https://project-management-first-try.adaptable.app/comments/`,
        { megalithId: id, text: comment }
      );
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={(event) => sendComment(event)}>
        <label htmlFor="">write a comment</label>
        <br />
        <input
          onChange={(event) => setComment(event.target.value)}
          type="text"
          value={comment}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default AddCommentsButton;
