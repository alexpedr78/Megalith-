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
      <div className="introListItem">
        <div className="paragraph-listItem">
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
          {/* {site.favorites.length ? (
            <p>
              <img src="./../assets/favori" alt="" />
            </p>
          ) : null} */}
        </div>

        {map ? <OneMegaMap oneMega={site} /> : null}
      </div>
      <div className="mapUpdate-button">
        {" "}
        <button className="button-55" onClick={() => setMap(!map)}>
          Map
        </button>
        <button className="button-55" onClick={() => handleEdit(id, name)}>
          Update
        </button>
        {editId === id ? (
          <div>
            <div>
              <label htmlFor="">New Name</label>
              <input
                className="button-55"
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder={name}
              />
            </div>
            <div>
              <label htmlFor="">New Description</label>
              <input
                className="button-55"
                type="text"
                value={updateDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder={description ? `${description}` : ""}
              />
            </div>
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
        ) : null}
      </div>
      <div className="delete-ListItem">
        <button className="button-55" onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
export default ListItem;
