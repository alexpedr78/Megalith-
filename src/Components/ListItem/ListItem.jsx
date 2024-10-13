import React, { useEffect, useState } from "react";
import "./listItem.css";
import axios from "axios";

function ListItem({
  site,
  handleDelete,
  editId,
  setEditId,
  setMegalith,
  megalith,
}) {
  const isEditing = editId === site.id || editId === site._id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedName, setUpdatedName] = useState(site.name);
  const [updatedDescription, setUpdatedDescription] = useState(
    site.description || ""
  );

  useEffect(() => {
    if (isEditing) {
      setUpdatedName(site.name);
      setUpdatedDescription(site.description || "");
    }
  }, [isEditing, site]);

  function handleCancelEdit() {
    setEditId(null);
  }

  const handleUpdate = async () => {
    try {
      // Update the backend
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/megalith/${site._id}`,
        {
          name: updatedName,
          description: updatedDescription,
        }
      );

      // Update the frontend state after successful backend update
      setMegalith((prevMegalith) =>
        prevMegalith.map((item) =>
          item.id === site.id || item._id === site._id
            ? { ...item, name: updatedName, description: updatedDescription }
            : item
        )
      );

      // Exit the editing mode
      setEditId(null);
    } catch (error) {
      console.error("Error updating the item:", error);
    }
  };

  return (
    <div className="ListItem">
      {isEditing ? (
        <div className="editContainer">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Update name"
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Update description"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className="viewContainer">
          <h3>{site.name}</h3>
          <p>Type: {site.type}</p>
          <p>State: {site.state}</p>
          <p>Village: {site.village}</p>
          <div className="buttonGroup">
            <button
              className="button-50"
              onClick={() => setEditId(site.id || site._id)} // Set editId to open edit form
            >
              Edit
            </button>
            <button
              className="button-53"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Are you sure you want to delete this item?</p>
            <button
              onClick={() => {
                handleDelete(site.id || site._id);
                setShowDeleteModal(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;
