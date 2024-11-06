import React, { useState } from "react";
import SelectComponent from "../SelectComponent/SelectComponent";
import MegalithTypeOptions from "../SelectComponent/TypeOptions";
import RegionOptions from "../SelectComponent/RegionOptions";
import "./AddMegalith.css";

const MegalithRegistrationForm = ({
  onSubmit,
  clickedLatLng,
  setClickedLatLng,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    state: "",
    village: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.type || !formData.state) {
      alert("Please select a valid type and region.");
      return;
    }

    if (!clickedLatLng) {
      alert("Please click on the map to select a location for your Megalith.");
      return;
    }

    const newMegalith = {
      ...formData,
      position: {
        lat: clickedLatLng.lat,
        long: clickedLatLng.lng,
      },
    };

    onSubmit(newMegalith);

    setFormData({
      name: "",
      type: "",
      state: "",
      village: "",
      description: "",
    });
    setClickedLatLng(null);
  };

  return (
    <form onSubmit={handleSubmit} className="megalith-registration-form">
      <div className="form-group">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className="form-input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter Megalith name"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Type:</label>
        <SelectComponent
          options={MegalithTypeOptions}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Region:</label>
        <SelectComponent
          options={RegionOptions}
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Village:</label>
        <input
          type="text"
          className="form-input"
          value={formData.village}
          onChange={(e) =>
            setFormData({ ...formData, village: e.target.value })
          }
          placeholder="Enter village name"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          className="form-textarea"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter a description"
        />
      </div>

      {clickedLatLng && (
        <div className="form-group">
          <label className="form-label">Selected Coordinates:</label>
          <input
            type="text"
            className="form-input"
            value={`Lat: ${clickedLatLng.lat}, Lng: ${clickedLatLng.lng}`}
            readOnly
          />
        </div>
      )}

      <button type="submit" className="find-location-button">
        Register Megalith
      </button>
    </form>
  );
};

export default MegalithRegistrationForm;
