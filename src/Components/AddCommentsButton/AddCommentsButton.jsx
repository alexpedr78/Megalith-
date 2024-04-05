import React from "react";
import { useState } from "react";
import axios from "axios";

function AddCommentsButton({ id }) {
  const [description, setDescription] = useState(null);
  async function sendComment() {
    try {
      let response = await axios.post();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={() => sendComment()}>
        <label htmlFor="">write a comment</label>
        <br />
        <input type="text" />
      </form>
    </div>
  );
}

export default AddCommentsButton;
