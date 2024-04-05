import React from "react";

function DisplayMegalithComponent(type, region, setMarkers) {
  return async function displayMegalith() {
    let apiUrl =
      "https://project-management-first-try.adaptable.app/megalith?_embed=favorites&";
    let params = [];
    if (region !== "-1") {
      params.push(`state=${region}`);
    }
    if (type !== "-1") {
      params.push(`type=${type}`);
    }
    if (type === "-2" && region === "-2") {
      params;
    }
    if (type === "-1" && region === "-1") {
      return;
    }

    try {
      const response = await axios.get(apiUrl + params.join("&"));

      setMarkers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export default DisplayMegalithComponent;
