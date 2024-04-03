import "./ListItem.css";
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
        <p>{name ? `Name of the site : ${name}` : null}</p>

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
export default ListItem;
