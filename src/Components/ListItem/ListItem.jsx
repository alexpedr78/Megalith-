import React, { useEffect, useState } from "react";
import "./listItem.css";
import axios from "axios";
import MiniMap from "../MiniMap/MiniMap";
import CommentForm from "../AddCommentsButton/AddCommentsButton";
import CommentItem from "../CommentItem/commentItem";

function ListItem({ site, handleDelete, setMegalith }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [updatedFields, setUpdatedFields] = useState({
    name: site.name,
    description: site.description || "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (editId === site._id || editId === site.id) setIsEditing(true);
    else setIsEditing(false);
  }, [editId, site]);

  useEffect(() => {
    fetchComment();
  }, []);

  const handleFieldChange = (field, value) =>
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  const fetchComment = async () => {
    try {
      const commentsfetched = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${site._id}`
      );

      console.log("Fetched comments:", commentsfetched.data);

      const commentsData = Array.isArray(commentsfetched.data)
        ? commentsfetched.data
        : [commentsfetched.data];

      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching the comments:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/megalith/${site._id}`,
        updatedFields
      );

      setMegalith((prev) =>
        prev.map((item) =>
          item._id === site._id ? { ...item, ...updatedFields } : item
        )
      );
      setEditId(null);
    } catch (error) {
      console.error("Error updating the item:", error);
    }
  };
  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };
  return (
    <div className="ListItem">
      {isEditing ? (
        <div className="editContainer">
          <input
            type="text"
            value={updatedFields.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder="Update name"
          />
          <textarea
            value={updatedFields.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            placeholder="Update description"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </div>
      ) : (
        <div className="viewContainer">
          <h3>{site.name}</h3>
          <p>Type: {site.type}</p>
          <p>State: {site.state}</p>
          <p>Village: {site.village}</p>
          <div className="buttonGroup">
            <button className="button-50" onClick={() => setEditId(site._id)}>
              Edit
            </button>
            <button
              className="button-53"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
          <MiniMap lat={site.position.lat} lng={site.position.long} />
          {comments &&
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}

          <CommentForm
            addComment={addComment}
            megalithId={site._id}
          ></CommentForm>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={() => handleDelete(site._id)}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;
