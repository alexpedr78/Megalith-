import React from "react";
import { useState } from "react";

function commentItem(comment) {
  console.log(comment.comment);
  return (
    <div>
      <p>{comment.comment.text}</p>
    </div>
  );
}
export default commentItem;
