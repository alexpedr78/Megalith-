import React, { useState } from "react";
// import "./AddMegalithForm.css"; // Optional CSS file for st
import SelectComponent from "../SelectComponent/SelectComponent";
import MegalithTypeOptions from "../SelectComponent/TypeOptions";
import RegionOptions from "../SelectComponent/RegionOptions";
const AddMegalithForm = ({ onSubmit, clickedLatLng, setClickedLatLng }) => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    type: "",
    village: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!clickedLatLng) {
      alert("Please click on the map to select a location for your Megalith.");
      return;
    }

    // Pass the form data along with clickedLatLng to the onSubmit function provided by the parent
    const newMegalith = {
      ...formData,
      position: {
        lat: clickedLatLng.lat,
        long: clickedLatLng.lng,
      },
    };
    onSubmit(newMegalith);
    // Reset form and clickedLatLng after submission
    setFormData({
      name: "",
      state: "",
      type: "",
      village: "",
      description: "",
    });
    setClickedLatLng(null);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="formMapPage">
        <label className="form-label">Name :</label>
        <input
          className="form-input"
          type="text"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </div>
      <div className="formMapPage">
        <SelectComponent
          label="Type"
          options={MegalithTypeOptions}
          name="type"
          value={formData.type}
          onChange={(event) =>
            setFormData({ ...formData, type: event.target.value })
          }
        />
      </div>
      <div className="formMapPage">
        <label className="form-label">Village :</label>
        <input
          className="form-input"
          type="text"
          value={formData.village}
          onChange={(event) =>
            setFormData({ ...formData, village: event.target.value })
          }
        />
      </div>
      <div className="formMapPage">
        <SelectComponent
          label="Region"
          options={RegionOptions}
          name="state"
          value={formData.state}
          onChange={(event) =>
            setFormData({ ...formData, state: event.target.value })
          }
        />
      </div>
      <div className="formMapPage">
        <label className="form-label">Description :</label>
        <input
          className="form-input"
          type="text"
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
        />
      </div>
      {clickedLatLng && (
        <div className="formMapPage">
          <label className="form-label">Selected Coordinates :</label>
          <input
            className="form-input"
            type="text"
            value={`Lat: ${clickedLatLng.lat}, Lng: ${clickedLatLng.lng}`}
            readOnly
          />
        </div>
      )}
      <button className="primary-button" type="submit">
        Add your discovery
      </button>
    </form>
  );
};

export default AddMegalithForm;
