import React, { useEffect, useState } from "react";
import "./listItem.css";
import axios from "axios";
import MiniMap from "../MiniMap/MiniMap";

function ListItem({
  site,
  handleDelete,
  editId,
  setEditId,
  setMegalith,
  megalith,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({
    name: site.name,
    description: site.description || "",
  });

  useEffect(() => {
    if (editId === site._id || editId === site.id) setIsEditing(true);
    else setIsEditing(false);
  }, [editId, site]);

  const handleFieldChange = (field, value) =>
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/megalith/${site._id}`,
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
