import React from "react";
import { useState } from "react";
function AddCommentsButton({ id }) {
  const [description, setDescription] = useState(null);
  return (
    <div>
      <label htmlFor="">write a comment</label>
      <br />
      <input type="text" />
    </div>
  );
}

export default AddCommentsButton;
