import React, { useState } from "react";
import axios from "axios";
import "./CommentForm.css";

const CommentForm = ({ megalithId, onCommentAdded }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Comment text is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments`,
        {
          megalithId,
          text,
        }
      );

      if (response.status === 201) {
        setText("");
        onCommentAdded(response.data);
      }
    } catch (err) {
      setError("Failed to post the comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      ></textarea>
      {error && <p className="error-message">{error}</p>}
      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Posting..." : "Submit Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
