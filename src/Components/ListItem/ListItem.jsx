import "./ListItem.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import OneMegaMap from "../OneMegaMap/OneMegaMap";
import { useState } from "react";
function ListItem({
  site,
  updateDescription,
  setUpdatedDescription,
  updatedName,
  setUpdatedName,
  handleCancelEdit,
  handleEdit,
  handleDelete,
  handleUpdate,
  editId,
}) {
  const [map, setMap] = useState(false);
  const { id, state, type, name, village, description, position } = site;

  return (
    <article className="megalithItem" key={id}>
      <div>
        <Link to={`/list/${id}`}>
          <p>{name ? `Name of the site : ${name}` : null}</p>
        </Link>
        <p>{type ? `Category of the site : ${type}` : null}</p>
        <p>{state ? `Region : ${state}` : null}</p>
        <p>{village ? `Village : ${village}` : null}</p>
        <p>{description ? `Description : ${description}` : null}</p>
        <p>
          {position
            ? `Position of the site : (${
                position.lat ? position.lat : "N/A"
              }, ${position.long ? position.long : "N/A"})`
            : null}
        </p>
        {/* {site.favorite ? <p>Favorite</p> : null} */}
      </div>
      <div>
        {" "}
        <button onClick={() => setMap(!map)}>map</button>
        {map ? <OneMegaMap oneMega={site} /> : null}
      </div>
      <button>add to favorite</button>
      <button className="button-55" onClick={() => handleDelete(id)}>
        Delete
      </button>

      {/* ///////////////////////////////////////////////////// */}
      {editId === id ? (
        <div>
          <input
            className="button-55"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder={name}
          />
          <input
            className="button-55"
            type="text"
            value={updateDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder={description ? `${description}` : ""}
          />
          <div className="buttonInsideEdit">
            <button
              className="button-55"
              onClick={() => {
                handleUpdate(id, {
                  id,
                  state,
                  type,
                  name: updatedName,
                  village,
                  description: updateDescription,
                  position: {
                    long: position.long,
                    lat: position.lat,
                  },
                });
                setUpdatedName(""); // Reset updated name
                setUpdatedDescription(""); // Reset updated description
              }}
            >
              Save
            </button>
            <button
              className="button-55"
              onClick={() => {
                handleCancelEdit();
                setUpdatedName(""); // Reset updated name
                setUpdatedDescription("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button className="button-55" onClick={() => handleEdit(id, name)}>
            Update
          </button>
        </div>
      )}
      {/* /////////////////// */}
    </article>
  );
}
ListItem.propTypes = {
  site: PropTypes.shape({
    id: PropTypes.number.isRequired,
    state: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    village: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.shape({
      long: PropTypes.number,
      lat: PropTypes.number,
    }),
  }).isRequired,
  map: PropTypes.bool.isRequired,
  setMap: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  setUpdatedDescription: PropTypes.func.isRequired,
  updatedName: PropTypes.string.isRequired,
  setUpdatedName: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  editId: PropTypes.number,
};
export default ListItem;
